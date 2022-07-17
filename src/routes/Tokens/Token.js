import React from "react";
import {Card, Row, Col} from "antd";
import  Withdraw  from "./Withdraw";
import  Deposit  from "./Deposit";
import  BuyButton  from "../algolia/Buy";

const {Meta} = Card;



const TokenItem = ({ title, creator, description, balance, link, image, 
		number, addTokens, withdraw, deposit, token, address }) => {
  return (
    <div className="gx-product-item gx-product-vertical" >
    <Card
        title={creator}
        extra={ <a href={link} target="_blank"><span className="gx-link">Explore</span></a>}
        cover={<img alt="example" src={image}/>}
        bordered={false}
        >
      <div >
      <ul className="gx-login-list" style={{"marginBottom": "20px", "marginLeft": "0px"}} >
     <li
                  onClick={ async () => {
					  console.log("Add Contracts to MetaMask clicked");
					  await addTokens(number);
					}}
                   >
                   {"Add to MetaMask"}
      </li>
      </ul>
      </div>

      <div className="gx-product-name" style={{"marginBottom": "30px", "marginLeft": "0px"}}>
      <p>{description}</p>
        <Meta
        title={title}
        description={balance}
      />
      </div>
     <div className="gx-product-name">
        <span style={{ float: "right"}}>
        <Withdraw
        item = {token}
        address = {address}
        withdraw={withdraw}
        key={token.token + "Withdraw"}
        />
        </span>

        <span style={{ float: "left"}}>
        <Deposit
        item = {token}
        address = {address}
        deposit={deposit}
        key={token.token + "Deposit"}
        />
        </span>

  </div>
    </Card>
    </div>

  );
};

export default TokenItem;


