import React, {useState, useEffect} from "react";
import {Card, Row, Col, Button} from "antd";
import { acceptDeposit, rejectDeposit } from "../../blockchain/metamask";
import { getEthereumDeposits } from "../../blockchain/wtoken";

const { REACT_APP_OWNER_ADDRESS } = process.env;
const {Meta} = Card;


const DepositRequest = ({ deposit, address }) => {

   const [loadingAccept, setLoadingAccept] = useState(false);
   const [loadingReject, setLoadingReject] = useState(false);
   const [wdeposits, setWDeposits] = useState([]);
   const [depositsLoaded, setDepositsLoaded] = useState(false);
   
   const handleAccept = async () => {
		setLoadingAccept( true );	  
		await acceptDeposit(address, deposit.request, deposit.address);
		setLoadingAccept( false);
	};
	
   const handleReject = async () => {
		setLoadingReject( true );	  
		await rejectDeposit(address, deposit.request, deposit.address);
		setLoadingReject( false);
	};

     useEffect(() => {
            async function loadDeposits() {
            		const results = await getEthereumDeposits(deposit.contract, deposit.from);
  					setWDeposits(results);   
				    setDepositsLoaded(true);
        }
      loadDeposits()
      },[deposit]);	




  return (
    <div lassName="gx-product-item" >
    <Card
        title={"Deposit request " + deposit.token + " No " + deposit.request}
        extra={ <a href={deposit.url} target="_blank"><span className="gx-link">Explore</span></a>}
        bordered={false}
        key = {"depositrequestCard"+deposit.address.toString()+deposit.request.toString()}
        >
      <div className="gx-product-name">
      <Row key={"DepositsListRow"}>
      <Col xl={8} lg={12} md={12} sm={12} xs={24} key={"DepositListColName"+deposit.address.toString()+deposit.request.toString()}>
        <Meta
			title={"Name"}
			description={deposit.client.name}
			style={{"marginBottom": "10px"}}
      	/>
      	</Col>
      	<Col xl={8} lg={12} md={12} sm={12} xs={24} key={"DepositListColCountry"+deposit.address.toString()+deposit.request.toString()}>
      	<Meta
			title={"Country"}
			description={deposit.client.country}
			style={{"marginBottom": "10px"}}
      	/>
      	</Col>
      	<Col xl={8} lg={12} md={12} sm={12} xs={24} key={"DepositListColDOB"+deposit.address.toString()+deposit.request.toString()}>
      	<Meta
			title={"DOB"}
			description={deposit.client.DOB}
			style={{"marginBottom": "10px"}}
      	/>
      	</Col>
       	<Col xl={8} lg={12} md={12} sm={12} xs={24} key={"DepositListColRating"+deposit.address.toString()+deposit.request.toString()}>
      	<Meta
			title={"Credit rating"}
			description={deposit.client.rating}
			style={{"marginBottom": "10px"}}
      	/>
      	</Col>
      	<Col xl={8} lg={12} md={12} sm={12} xs={24} key={"DepositListColAmount"+deposit.address.toString()+deposit.request.toString()}>
        <Meta
			title={"Amount"}
			description={deposit.token + " " + parseFloat(deposit.amount/1e18).toLocaleString('en') }
			style={{"marginBottom": "10px"}}
      	/>
       	</Col>
      	<Col xl={8} lg={12} md={12} sm={12} xs={24} key={"DepositListColAddress"+deposit.address.toString()+deposit.request.toString()}>
      	 <Meta
			title={"Client Ethereum Address"}
			description={deposit.from}
			style={{"marginBottom": "10px"}}
      	/>
      	</Col>
      	 <Col xl={8} lg={12} md={12} sm={12} xs={24} key={"DepositListColPayment"+deposit.address.toString()+deposit.request.toString()}>
      	 <Meta
			title={"Payment method"}
			description={deposit.payment}
			style={{"marginBottom": "10px"}}
      	/>
      	</Col>
      	</Row>
      </div>
      <div id="depositHistoryDiv" className="gx-algolia-content-inner" style={{"marginBottom": "5px"}}>
      <div>
    	 	<Meta 
					 key = {"deposithistorykey"}
					 title={"Deposits made on Ethereum" }
					 style={{"marginBottom": "5px"}}
			   />  
	  </div>
		  {(depositsLoaded==true)?
		  (    
			  wdeposits.map(deposit=> (
					 <div>
						   {	deposit.token + " " + parseFloat(deposit.amount/1e18).toLocaleString('en') + " made " +
							  deposit.timeAgo + " ago on " + deposit.time }
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
          Accept Deposit
          </Button>
        </span>
        <span style={{ float: "left"}}>
        <Button type="primary"
            onClick={handleReject}
            key="buttond"
            loading={loadingReject}
          >
          Reject Deposit
          </Button>
        </span>
        </div>
        ):("")}
    </div>

    </Card>

    </div>

  );
};

export default DepositRequest;

