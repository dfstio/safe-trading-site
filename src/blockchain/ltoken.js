import {message} from 'antd';
import logger from "../serverless/logger";
const logm = logger.debug.child({ winstonModule: 'ltoken' });

const ethers = require("ethers");
const LJSON = require("../contract/LERC20.json");
const tokens = require("../contract/tokens.json");
const prices = require("../contract/prices.json");


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

export async function getUnprocessedWithdraws(id)
{
	const log = logm.child({id, wf: "getUnprocessedWithdraws"});
	const contract = new ethers.Contract(tokens[id].address, LJSON, provider);
	const unprocessedWithdrawsCount = await contract.unprocessedWithdraws();
	const withdrawsCount = await contract.withdrawRequestsCount();
    
    let results = [];
    let count;
    
    for( let i = withdrawsCount -1; i >= 0; i--)
    {
    	try {
    		   const withdraw = await contract.withdrawRequests(i);
			   if( withdraw.processed == false)
			   {
				   results.push( {...withdraw, contract: id, request: i } );
				   count++;
			   };
    	} catch (error) { log.error("catch", {error} );};
    	if( count == unprocessedWithdrawsCount) return results;
    };
	return results;
};


export async function getDeposits(address)
{
	const log = logm.child({address, wf: "getDeposits"});
	let results = [];
	let totalAmount = 0;
	let contract;
	let filter;
	let events;
	
	if( address == "" ) return {results, totalAmount};
	const startTime = Date.now();
	
    for( let id = 0; id < tokens.length; id++)
    {
    	try {
			  contract = new ethers.Contract(tokens[id].address, LJSON, provider);
			  filter = contract.filters.DepositAccepted(null, address); 
			  events = await contract.queryFilter(filter);
			  //console.log("Found ", events.length, tokens[id].token, "events", tokens[id].address);

			  for( let i = 0; i < events.length; i++)
			  {
				  const block = await provider.getBlock(events[i].blockNumber);
				  const timeStr = formatWinstonTimeDays(startTime-block.timestamp*1000);
				  let date = new Date(block.timestamp*1000);
				  totalAmount = totalAmount +  (events[i].args.amount * prices[id]);
				  results.push({ amount: events[i].args.amount,
								paymentMethod: events[i].args.paymentMethod,
								id: events[i].args.id,
								blockNumber: events[i].blockNumber,
								timestamp: block.timestamp,
								timeAgo: timeStr,
								time: date.toUTCString(),
								token: tokens[id].token,
								tokenId: id
				  });
			  };
		 } catch (error) { log.error("catch", {error} );};
    };
	let sortedResults = results.sort((a, b) => b.timestamp - a.timestamp);
	//console.log("Total amount", totalAmount, "Results", sortedResults);
	return {results: sortedResults, totalAmount};
};

export async function getWithdraws(address)
{
	const log = logm.child({address, wf: "getWithdraws"});
	let results = [];
	let totalAmount = 0;
	let contract;
	let filter;
	let events;
	
	if( address == "" ) return {results, totalAmount};
	const startTime = Date.now();
	
    for( let id = 0; id < tokens.length; id++)
    {
    	try {
				contract = new ethers.Contract(tokens[id].address, LJSON, provider);
				filter = contract.filters.WithdrawAccepted(null, address); 
				events = await contract.queryFilter(filter);
				//console.log("Found ", events.length, tokens[id].token, "events", tokens[id].address);

				for( let i = 0; i < events.length; i++)
				{
					const block = await provider.getBlock(events[i].blockNumber);
					const timeStr = formatWinstonTimeDays(startTime-block.timestamp*1000);
					let date = new Date(block.timestamp*1000);
					totalAmount = totalAmount +  (events[i].args.amount * prices[id]);
					results.push({ amount: events[i].args.amount,
								  paymentMethod: events[i].args.paymentMethod,
								  id: events[i].args.id,
								  blockNumber: events[i].blockNumber,
								  timestamp: block.timestamp,
								  timeAgo: timeStr,
								  time: date.toUTCString(),
								  token: tokens[id].token,
								  tokenId: id
					});
				};
		    } catch (error) { log.error("catch", {error} );};
	};

	let sortedResults = results.sort((a, b) => b.timestamp - a.timestamp);
	//console.log("Total amount", totalAmount, "Results", sortedResults);
	return {results: sortedResults, totalAmount};
};


function formatWinstonTimeDays( ms )
{
    if( ms === undefined ) return "";
    if( ms < 1000) return ms + " ms";
    if ( ms < 60 * 1000) return parseInt(ms/1000) + " sec";
    if ( ms < 60 * 60 * 1000) return parseInt(ms/1000/60) + " min";
    if ( ms < 24 * 60 * 60 * 1000) return parseInt(ms/1000/60/60) + " hours";
    return parseInt(ms/1000/60/60/24) + " days";
};

