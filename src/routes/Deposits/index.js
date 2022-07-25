import React, {useState, useEffect} from "react";
import { useSelector} from "react-redux";
import {Button, Row, Col, Card, Form} from "antd";
import DepositRequest from './DepositRequest';

import IntlMessages from "util/IntlMessages";

import { getUnprocessedDepositsCount, getUnprocessedDeposits} from "../../blockchain/ltoken";

const { REACT_APP_VIRTUOSO_BRANCH, REACT_APP_NETWORK_EXPLORER } = process.env;
const tokens = require("../../contract/tokens.json");
const clients = require("../../contract/clients.json");
const descriptions = require("../../contract/descriptions.json");
const paymentMethods = require("../../contract/paymentmethods.json");

const Deposits = () => {

  const address = useSelector(({blockchain}) => blockchain.address);

  const [deposits, setDeposits] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [contractsLoaded, setContractsLoaded] = useState(false);
  const [depositsLoaded, setDepositsLoaded] = useState(false);
  const [title, setTitle] = useState("Loading Unprocessed Deposits");


     useEffect(() => {
            async function loadContracts() {
            		let results = [];
					for(let i = 0; i < tokens.length; i++)
					{
					   const count = await getUnprocessedDepositsCount(i);
					   results.push({...tokens[i], count});
  					};
  					setContracts(results);   
				    setContractsLoaded(true);
        }
      loadContracts()
      },[address]);	


     useEffect(() => {
            async function loadDeposits() {
            		let results = [];
					for(let i = 0; i < tokens.length; i++)
					{
					   const deposits = await getUnprocessedDeposits(i);
					   for(let j = 0; j < deposits.length; j++)
					   {
					   		let client = {"id":0,"address":"Unknown","name":"Unknown","country":"Unknown","DOB":"Unknown",rating:0};
					   		try{
					   			client = clients.find(user => user.address == deposits[j].from);
					   		 } catch { 
					   		  	client = {"id":0,"address":"Unknown","name":"Unknown","country":"Unknown","DOB":"Unknown",rating:0};
					   		 };

					   		results.push({...deposits[j], ...tokens[i], 
					   			payment: paymentMethods[deposits[j].paymentMethod].description, 
					   			url: REACT_APP_NETWORK_EXPLORER + "address/" + tokens[i].address + "#events",
					   			client
					   			});
					   };

  					};
  					setDeposits(results);
					setTitle("Unprocessed Deposits");
					setDepositsLoaded(true);
					console.log(results);
        }
      loadDeposits()
      },[contracts]);


  return (
  <div className="gx-algolia-content-inner" style={{"marginBottom": "5px"}}>
  <div className="gx-product-item" >
  <Card
        title={title}
        bordered={false}
        >
    <Form
        key="formdeposits"
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
	<div id="depositRequestsDiv" className="gx-algolia-content-inner" style={{"marginBottom": "5px"}}>
    {(depositsLoaded==true)?
    (    
		 deposits.map(deposit=> (
			   <DepositRequest 
					 key = {"depositrequestkey"+deposit.address.toString()+deposit.request.toString()+deposit.token}
					 deposit={deposit}
					 address={address}
			   />  
		  ))
		  
	):('')} 
	</div>
	
     		
   </div>
  )
};


export default Deposits;

		 {/*
			 <Form.Item
				 name="deposit"
				 key={"deposit"+deposit.address+deposit.request}
				 style={{"marginBottom": "0px", "marginTop": "0px", "marginLeft": "50px"}}
				 >
			 {"Deposit " + deposit.amount + deposit.token + " from " + deposit.from + " payment:" + deposit.payment} 
			 </Form.Item>
		  */}
