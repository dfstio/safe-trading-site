import {message} from 'antd';
import logger from "../serverless/logger";
const logm = logger.debug.child({ winstonModule: 'ltoken' });

const ethers = require("ethers");
const LJSON = require("../contract/LERC20.json");
const tokens = require("../contract/tokens.json");


//const {REACT_APP_RPC_GOERLI, REACT_APP_SAFE_GOERLI} = process.env;
var provider = window.ethereum && new ethers.providers.Web3Provider(window.ethereum);

export async function getUnprocessedDepositsCount(id)
{
	const contract = new ethers.Contract(tokens[id].address, LJSON, provider);
	const depositsCount = await contract.unprocessedDeposits();
	return depositsCount;
};

export async function getUnprocessedWithdrawsCount(id)
{
	const contract = new ethers.Contract(tokens[id].address, LJSON, provider);
	const withdrawsCount = await contract.unprocessedWithdraws();
	return withdrawsCount;
};

export async function getUnprocessedDeposits(id)
{
	const log = logm.child({id, wf: "getUnprocessedDeposits"});
	const contract = new ethers.Contract(tokens[id].address, LJSON, provider);
	const unprocessedDepositsCount = await contract.unprocessedDeposits();
	const depositsCount = await contract.depositRequestsCount();
    
    let results = [];
    let count;
    
    for( let i = depositsCount -1; i >= 0; i--)
    {
    	try {
    		   const deposit = await contract.depositRequests(i);
			   if( deposit.processed == false)
			   {
				   results.push( {...deposit, contract: id, request: i } );
				   count++;
			   };
    	} catch (error) { log.error("catch", {error} );};
    	if( count == unprocessedDepositsCount) return results;
    };
	return results;
};


