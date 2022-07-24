import React, {useState, useEffect} from "react";
import {Card, Row, Col, Button} from "antd";
import { acceptWithdraw, rejectWithdraw } from "../../blockchain/metamask";
import { getDeposits, getWithdraws } from "../../blockchain/ltoken";

const paymentMethods = require("../../contract/paymentmethods.json");
const { REACT_APP_OWNER_ADDRESS } = process.env;
const {Meta} = Card;


const WithdrawRequest = ({ withdraw, address }) => {

   const [loadingAccept, setLoadingAccept] = useState(false);
   const [loadingReject, setLoadingReject] = useState(false);
   const [deposits, setDeposits] = useState([]);
   const [withdraws, setWithdraws] = useState([]);
   const [depositsLoaded, setDepositsLoaded] = useState(false);
   const [withdrawsLoaded, setWithdrawsLoaded] = useState(false);
   
   const handleAccept = async () => {
		setLoadingAccept( true );	  
		await acceptWithdraw(address, withdraw.request, withdraw.address);
		setLoadingAccept( false);
	};
	
   const handleReject = async () => {
		setLoadingReject( true );	  
		await rejectWithdraw(address, withdraw.request, withdraw.address);
		setLoadingReject( false);
	};

     useEffect(() => {
            async function loadWithdraws() {
            		const depositsResults = await getDeposits(withdraw.from);
            		const withdrawResults = await getWithdraws(withdraw.from);
            		setDeposits(depositsResults); 
  					setWithdraws(withdrawResults);   
  					setDepositsLoaded(true);
				    setWithdrawsLoaded(true);
        }
      loadWithdraws()
      },[withdraw]);	




  return (
    <div className="gx-product-item" >
    <Card
        title={"Withdraw request " + withdraw.token + " No " + withdraw.request}
        extra={ <a href={withdraw.url} target="_blank"><span className="gx-link">Explore</span></a>}
        bordered={false}
        key = {"withdrawrequestCard"+withdraw.address.toString()+withdraw.request.toString()}
        >
      <div className="gx-product-name">
      <Row key={"WithdrawsListRow"}>
      <Col xl={8} lg={12} md={12} sm={12} xs={24} key={"WithdrawListColName"+withdraw.address.toString()+withdraw.request.toString()+withdraw.token}>
        <Meta
			title={"Name"}
			description={withdraw.client.name}
			style={{"marginBottom": "10px"}}
      	/>
      	</Col>
      	<Col xl={8} lg={12} md={12} sm={12} xs={24} key={"WithdrawListColCountry"+withdraw.address.toString()+withdraw.request.toString()+withdraw.token}>
      	<Meta
			title={"Country"}
			description={withdraw.client.country}
			style={{"marginBottom": "10px"}}
      	/>
      	</Col>
      	<Col xl={8} lg={12} md={12} sm={12} xs={24} key={"WithdrawListColDOB"+withdraw.address.toString()+withdraw.request.toString()+withdraw.token}>
      	<Meta
			title={"DOB"}
			description={withdraw.client.DOB}
			style={{"marginBottom": "10px"}}
      	/>
      	</Col>
       	<Col xl={8} lg={12} md={12} sm={12} xs={24} key={"WithdrawListColRating"+withdraw.address.toString()+withdraw.request.toString()+withdraw.token}>
      	<Meta
			title={"Credit rating"}
			description={withdraw.client.rating}
			style={{"marginBottom": "10px"}}
      	/>
      	</Col>
      	<Col xl={8} lg={12} md={12} sm={12} xs={24} key={"WithdrawListColAmount"+withdraw.address.toString()+withdraw.request.toString()+withdraw.token}>
        <Meta
			title={"Amount"}
			description={withdraw.token + " " + parseFloat(withdraw.amount/1e18).toLocaleString('en') }
			style={{"marginBottom": "10px"}}
      	/>
       	</Col>
      	<Col xl={8} lg={12} md={12} sm={12} xs={24} key={"WithdrawListColAddress"+withdraw.address.toString()+withdraw.request.toString()+withdraw.token}>
      	 <Meta
			title={"Client Ethereum Address"}
			description={withdraw.from}
			style={{"marginBottom": "10px"}}
      	/>
      	</Col>
      	 <Col xl={8} lg={12} md={12} sm={12} xs={24} key={"WithdrawListColPM"+withdraw.address.toString()+withdraw.request.toString()+withdraw.token}>
      	 <Meta
			title={"Payment method"}
			description={withdraw.payment}
			style={{"marginBottom": "10px"}}
      	/>
      	</Col>
      	</Row>
      </div>
      <div id="withdrawHistoryDiv" className="gx-algolia-content-inner" style={{"marginBottom": "5px"}}>
      <div>
    	 	<Meta 
					 key = {"withdrawhistorykey"}
					 title={"Total deposits made: USD " + ((depositsLoaded==true)?parseFloat(deposits.totalAmount/1e18).toLocaleString('en'): "loading...")}
					 style={{"marginBottom": "5px"}}
			   />  
	  </div>
		  {(depositsLoaded==true)?
		  (    
			  deposits.results.map(withdraw=> (
					 <div key= {withdraw.token + withdraw.time + withdraw.id + "depositsTotal"}>
						   {	withdraw.token + " " + parseFloat(withdraw.amount/1e18).toLocaleString('en') + " made " +
							  withdraw.timeAgo + " ago on " + withdraw.time + " throught " + paymentMethods[withdraw.paymentMethod].network}
					 </div>  
				))
		  
		  ):('')} 

     </div>
     <div id="withdrawHistoryDivWithdraw" className="gx-algolia-content-inner" style={{"marginBottom": "5px"}}>
      <div>
    	 	<Meta 
					 key = {"withdrawhistorykeywithdraws"}
					 title={"Total withdraws made: USD " + ((withdrawsLoaded==true)?parseFloat(withdraws.totalAmount/1e18).toLocaleString('en'): "loading...")}
					 style={{"marginBottom": "5px"}}
			   />  
	  </div>
		  {(withdrawsLoaded==true)?
		  (    
			  withdraws.results.map(withdraw=> (
					 <div key= {withdraw.token + withdraw.time + withdraw.id + "withdrawsTotal"}>
						   {	withdraw.token + " " + parseFloat(withdraw.amount/1e18).toLocaleString('en') + " made " +
							  withdraw.timeAgo + " ago on " + withdraw.time + " throught " + paymentMethods[withdraw.paymentMethod].network}
					 </div>  
				))
		  
		  ):('')} 

     </div>
      <div>
      {( address == REACT_APP_OWNER_ADDRESS)?(
       <div>
       <span style={{ float: "right"}}>
        <Button type="primary"
            onClick={handleAccept}
            key="buttond"
            loading={loadingAccept}
          >
          Accept Withdraw
          </Button>
          </span>
          <span style={{ float: "left"}}>
        <Button type="primary"
            onClick={handleReject}
            key="buttond"
            loading={loadingReject}
          >
          Reject Withdraw
          </Button>
          </span>
          </div>
        ):("")}
    </div>

    </Card>

    </div>

  );
};

export default WithdrawRequest;

