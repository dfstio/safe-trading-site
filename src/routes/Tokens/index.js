import React, {useState} from "react";
import { useSelector} from "react-redux";
import api from "../../serverless/api";
import {Button, Row, Col} from "antd";
import TokenItem from './Token';

import IntlMessages from "util/IntlMessages";

import { addTokens, withdraw, deposit } from "../../blockchain/metamask";
const tokens = require("../../contract/tokens.json");
const descriptions = require("../../contract/descriptions.json");

const { REACT_APP_VIRTUOSO_BRANCH, REACT_APP_LUSD, REACT_APP_LEUR, REACT_APP_LETH, REACT_APP_NETWORK_EXPLORER } = process.env;


const Mint = () => {

  const address = useSelector(({blockchain}) => blockchain.address);
  const virtuosoBalance = useSelector(({blockchain}) => blockchain.virtuosoBalance);
  const lbalance = useSelector(({blockchain}) => blockchain.lbalance);
  const vb = virtuosoBalance/100;
  const LUSD = "LUSD " + vb.toFixed(2);

  let i;
  let explorerURL = [];
  let tk = [];
  console.log("lbalance", lbalance);
  
  for(i = 0; i < tokens.length; i++)
  {
  	 const balance = lbalance? lbalance[i] : 0;
  	 tk.push({ ...tokens[i],
  	 	url: REACT_APP_NETWORK_EXPLORER + "address/" + tokens[i].address,
  	 	balance: tokens[i].token + " " + parseFloat(balance/1e18).toLocaleString('en'),
  	 	description: descriptions[i].description,
  	 	image: descriptions[i].image,
  	 	number: i
  	 });
  }
  

  function add()
  {

            console.log("Add balance clicked", address);
            if( address !== "") api.add( address, 100, "Added $1 ");
  }


  return (
  <div className="gx-algolia-content-inner">

      <Row>
     {tk.map(token => (
      <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
            <TokenItem
              creator={"Safe Trading " + token.currency}
              title={"Your " + token.token + " balance is"}
              link={token.url}
              balance={token.balance}
              description={token.description}
              number={token.number}
              addTokens={addTokens}
              token={token}
              address={address}
              withdraw={withdraw}
              deposit={deposit}
              image={"https://res.cloudinary.com/virtuoso/image/fetch/h_300,q_100,f_auto/https://ipfs.io/ipfs/"+token.image}
              key={"Token " + token.token}

              />
        </Col>
     ))}
     {/*}
      <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
            <MintMenuItem
              creator="Safe Trading EUR"
              title="Your LEUR balance is"
              link={explorerURL[1]}
              price={amount[1]}
              description="LEUR token can be deposited and withdrawn thru SWIFT"
              image="https://res.cloudinary.com/virtuoso/image/fetch/h_300,q_100,f_auto/https://ipfs.io/ipfs/QmR9W1QjKnTfKhBQCGDM53jQtbFZQJNmDDTPJcacoDpfYC"
              key="LEUR Mint"

              />
        </Col>

        <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
            <MintMenuItem
              creator="Safe Trading ETH"
              title="Your LETH balance is"
              link={explorerURL[2]}
              price={amount[2]}
              description="LETH token can be deposited and withdrawn thru Ethereum (ETH) and Polygon (WETH) networks"
              image="https://res.cloudinary.com/virtuoso/image/fetch/h_300,q_100,f_auto/https://ipfs.io/ipfs/QmecWSZmjyRzzfVEx4qksNL4Qde5JeQMwGvcqyyb6L3Rod"
              key="ETH Mint"

              />
        </Col>
        <Col xxl={8}  xl={8} lg={12} md={12} sm={24} xs={24}>
            <MintMenuItem
              creator="Safe Trading Bitcoin"
              title="Your LBTC balance is"
              link={explorerURL[3]}
              price={amount[3]}
              description="BTC can be deposited and withdrawn thru Bitcoin, Ethereum (WBTC) and Polygon (WBTC) networks"
              image= "https://res.cloudinary.com/virtuoso/image/fetch/h_300,q_100,f_auto/https://ipfs.io/ipfs/QmPFVf47TupZ3VnC1HRd2ARwaEh8nogyE3ypaTs1V7ZDEk"
              key="BTC Mint"

              />
        </Col>
        <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
            <MintMenuItem
              creator="Safe Trading Gold"
              title="You hold receipts for"
              link={explorerURL[4]}
              price={amount[4]}
              description="Gold warehouse receipts can be deposited and withdrawn in bank office only"
              image="https://res.cloudinary.com/virtuoso/image/fetch/h_300,q_100,f_auto/https://ipfs.io/ipfs/QmaLGsErRCMxpKX9PBjXfMPdhY8sce4SZw179juChiHCoo"
              key="Gold receipts Mint"

              />
        </Col>
                <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
            <MintMenuItem
              creator="Safe Trading Metal Account"
              title="Your gold account balance is"
              link={explorerURL[5]}
              price={amount[5]}
              description="Gold on metal account can be deposited and withdrawn in bank office only"
              image="https://res.cloudinary.com/virtuoso/image/fetch/h_300,q_100,f_auto/https://ipfs.io/ipfs/QmTRUBh8JxTr3jfdYX2EVYUheVLHhGvUDRyCqhuZC1MTHc"
              key="Gold account Mint"

              />
        </Col>
        */}
        </Row>
      }

    </div>
  );
};

export default Mint;
