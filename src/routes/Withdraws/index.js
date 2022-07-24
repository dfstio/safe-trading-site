import React, {useState, useEffect} from "react";
import { useSelector} from "react-redux";
import {Button, Row, Col, Card, Form} from "antd";
import WithdrawRequest from './WithdrawRequest';

import IntlMessages from "util/IntlMessages";

import { getUnprocessedWithdrawsCount, getUnprocessedWithdraws} from "../../blockchain/ltoken";

const { REACT_APP_VIRTUOSO_BRANCH, REACT_APP_NETWORK_EXPLORER } = process.env;
const tokens = require("../../contract/tokens.json");
const clients = require("../../contract/clients.json");
const descriptions = require("../../contract/descriptions.json");
const paymentMethods = require("../../contract/paymentmethods.json");

const Withdraws = () => {

  const address = useSelector(({blockchain}) => blockchain.address);

  const [withdraws, setWithdraws] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [contractsLoaded, setContractsLoaded] = useState(false);
  const [withdrawsLoaded, setWithdrawsLoaded] = useState(false);
  const [title, setTitle] = useState("Loading Unprocessed Withdraws");


     useEffect(() => {
            async function loadContracts() {
            		let results = [];
					for(let i = 0; i < tokens.length; i++)
					{
					   const count = await getUnprocessedWithdrawsCount(i);
					   results.push({...tokens[i], count});
  					};
  					setContracts(results);   
				    setContractsLoaded(true);
        }
      loadContracts()
      },[address]);	


     useEffect(() => {
            async function loadWithdraws() {
            		let results = [];
					for(let i = 0; i < tokens.length; i++)
					{
					   const withdraws = await getUnprocessedWithdraws(i);
					   for(let j = 0; j < withdraws.length; j++)
					   {
					   		let client = {"id":0,"address":"Unknown","name":"Unknown","country":"Unknown","DOB":"Unknown",rating:0};
					   		try{
					   			client = clients.find(user => user.address == withdraws[j].from);
					   		 } catch { 
					   		  	client = {"id":0,"address":"Unknown","name":"Unknown","country":"Unknown","DOB":"Unknown",rating:0};
					   		 };

					   		results.push({...withdraws[j], ...tokens[i], 
					   			payment: paymentMethods[withdraws[j].paymentMethod].description, 
					   			url: REACT_APP_NETWORK_EXPLORER + "address/" + tokens[i].address + "#events",
					   			client
					   			});
					   };

  					};
  					setWithdraws(results);
					setTitle("Unprocessed Withdraws");
					setWithdrawsLoaded(true);
					console.log(results);
        }
      loadWithdraws()
      },[contracts]);


  return (
  <div className="gx-algolia-content-inner" style={{"marginBottom": "5px"}}>
  <div className="gx-product-item" >
  <Card
        title={title}
        bordered={false}
        >
    <Form
        key="formwithdraws"
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          sell: 2,
          buy: 0
        }}
      >
      
    {(contractsLoaded==true)?
    (     
		 contracts.map(contract=> (
			 <Form.Item
				 
				 key={"contract"+contract.address}
				 style={{"marginBottom": "0px", "marginTop": "0px", "marginLeft": "50px"}}
				 >
			 { "Safe Trading " + contract.currency + " (" + contract.token + "):   " + contract.count }
			 </Form.Item>
		  ))
	):('')}
	</Form>	
	</Card>
	</div>
	<div id="withdrawRequestsDiv" className="gx-algolia-content-inner" style={{"marginBottom": "5px"}}>
    {(withdrawsLoaded==true)?
    (    
		 withdraws.map(withdraw=> (
			   <WithdrawRequest 
					 key = {"withdrawrequestkey"+withdraw.address.toString()+withdraw.request.toString()}
					 withdraw={withdraw}
					 address={address}
			   />  
		  ))
		  
	):('')} 
	</div>
	
     		
   </div>
  )
};


export default Withdraws;

		 {/*
			 <Form.Item
				 name="withdraw"
				 key={"withdraw"+withdraw.address+withdraw.request}
				 style={{"marginBottom": "0px", "marginTop": "0px", "marginLeft": "50px"}}
				 >
			 {"Withdraw " + withdraw.amount + withdraw.token + " from " + withdraw.from + " payment:" + withdraw.payment} 
			 </Form.Item>
		  */}
