import logger from "../serverless/logger";
const logm = logger.debug.child({ winstonModule: 'wtoken' });

const ethers = require("ethers");
const WJSON = require("../contract/WERC20.json");
const wtokens = require("../contract/wtokens.json");


const {REACT_APP_RPC_GOERLI, REACT_APP_SAFE_GOERLI} = process.env;
const ethereumprovider = new ethers.providers.JsonRpcProvider(REACT_APP_RPC_GOERLI);


export async function encodeFunctionCall(id, name, args)
{
	  console.log("encodeFunctionCall", id, name, args);
	  const wtokenInterface = new ethers.utils.Interface(WJSON);
	  const data = wtokenInterface.encodeFunctionData(name, args);
	  return {to: wtokens[id].address, data};
}

export async function getEthereumDeposits(id, address)
{
	const contract = new ethers.Contract(wtokens[id].address, WJSON, ethereumprovider);
	const filter = contract.filters.Transfer(address, REACT_APP_SAFE_GOERLI); 
	let events = await contract.queryFilter(filter);
    console.log("Found ", events.length, "events");
    
    let results = [];
    const startTime = Date.now();
    
    for( let i = 0; i < events.length; i++)
    {
    	const block = await ethereumprovider.getBlock(events[i].blockNumber);
    	const timeStr = formatWinstonTimeDays(startTime-block.timestamp*1000);
    	let date = new Date(block.timestamp*1000);
    	results.push({ amount: events[i].args.value,
    				  blockNumber: events[i].blockNumber,
    				  timeAgo: timeStr,
    				  time: date.toUTCString(),
    				  token: wtokens[id].token
    	});
    };
	console.log("Results", results);
	return results;
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

