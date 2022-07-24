import { ethers } from 'ethers'
import EthersAdapter from '@gnosis.pm/safe-ethers-lib'
import { SafeTransactionDataPartial } from '@gnosis.pm/safe-core-sdk-types'
import Safe from '@gnosis.pm/safe-core-sdk'
import SafeServiceClient from '@gnosis.pm/safe-service-client'

const { REACT_APP_SAFE_GOERLI, REACT_APP_RPC_GOERLI, REACT_APP_RPC_SAFE_GOERLI, REACT_APP_SAFE_DELEGATE_KEY } = process.env;


export async function safeProposeTransaction(to, data)
{
	const safeAddress = ethers.utils.getAddress(REACT_APP_SAFE_GOERLI);
	const ethereumprovider = new ethers.providers.JsonRpcProvider(REACT_APP_RPC_GOERLI);
	const wallet = new ethers.Wallet(REACT_APP_SAFE_DELEGATE_KEY); 
	const safeDelegate = wallet.connect(ethereumprovider);
	const ethAdapter = new EthersAdapter({
			 ethers,
			 signer: safeDelegate 
		   });

	const safeSdk: Safe = await Safe.create({ ethAdapter, safeAddress });
	
	const transaction: SafeTransactionDataPartial = {
	   to: ethers.utils.getAddress(to),
	   value: 0,
	   data: data
	 };
	 
	 const safeTransaction = await safeSdk.createTransaction(transaction);
	 const safeTxHash = await safeSdk.getTransactionHash(safeTransaction);
	 const signature = await safeSdk.signTransactionHash(safeTxHash);
  
	 const transactionConfig: ProposeTransactionProps = {
	   safeAddress,
	   safeTxHash,
	   safeTransactionData: safeTransaction.data,
	   senderAddress: ethers.utils.getAddress(wallet.address),
	   senderSignature: signature.data,
	   origin: "Sent via Safe Trading withdraw frontend"
	 };
	 
	 //console.log("transactionConfig", transactionConfig);
	 
	 const safeService = new SafeServiceClient({
						txServiceUrl: REACT_APP_RPC_SAFE_GOERLI,
						ethAdapter
					  });


	 await safeService.proposeTransaction(transactionConfig);
};
	 
