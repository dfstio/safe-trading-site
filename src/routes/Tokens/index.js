import React, {useState} from "react";
import { useSelector} from "react-redux";
import api from "../../serverless/api";
import {Button, Row, Col} from "antd";
import MintMenuItem from './MintMenu';

import IntlMessages from "util/IntlMessages";

import { checkBalance } from "../../blockchain/metamask";
const tokens = require("../../contract/tokens.json");

const { REACT_APP_VIRTUOSO_BRANCH, REACT_APP_LUSD, REACT_APP_LEUR, REACT_APP_LETH, REACT_APP_NETWORK_EXPLORER } = process.env;


const Mint = () => {

  const address = useSelector(({blockchain}) => blockchain.address);
  const virtuosoBalance = useSelector(({blockchain}) => blockchain.virtuosoBalance);
  const lbalance = useSelector(({blockchain}) => blockchain.lbalance);
  const vb = virtuosoBalance/100;
  const LUSD = "LUSD " + vb.toFixed(2);

  let i;
  let explorerURL = [];
  for(i = 0; i < tokens.length; i++) explorerURL.push(REACT_APP_NETWORK_EXPLORER + "address/" + tokens[i].address);	
  

  function add()
  {

            console.log("Add balance clicked", address);
            if( address !== "") api.add( address, 100, "Added $1 ");
  }


  return (
  <div className="gx-algolia-content-inner">

  {(REACT_APP_VIRTUOSO_BRANCH === 'polygon')?(
    <Row>
      <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
            <MintMenuItem
              creator="Your NFT Token"
              title="Create your own private NFT token"
              link="/mint/custom"
              price="$10 for private NFT token or $100 for public NFT token"
              description="Private NFT token will be visible only to you on NFT Virtuoso marketplace, except when you'll put it for sale. Public NFT token is always visible to everyone on NFT Virtuoso marketplace"
              image="https://res.cloudinary.com/virtuoso/image/fetch/h_300,q_100,f_auto/https://content.nftvirtuoso.io/image/mintimages/private.png"
              key="Private Mint"

              />
        </Col>
        </Row>
  ):(
      <Row>
      <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
            <MintMenuItem
              creator="Safe Trading USD"
              title="Your LUSD balance is"
              link={explorerURL[0]}
              price={tokens[0].token + " " + parseFloat(lbalance[0]/1e18).toLocaleString('en')}
              description="LUSD token can be deposited and withdrawn thru SWIFT, Ethereum USDT and Tron USDT networks"
              image="https://res.cloudinary.com/virtuoso/image/fetch/h_300,q_100,f_auto/https://ipfs.io/ipfs/QmbARy1hHoHrW2mH3R2rkWKpUSayeQ77XKNA7aW5BVy1hE"
              key="LUSD Mint"

              />
        </Col>

      <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
            <MintMenuItem
              creator="Safe Trading EUR"
              title="Your LEUR balance is"
              link={explorerURL[1]}
              price={tokens[1].token + " " + parseFloat(lbalance[1]/1e18).toLocaleString('en')}
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
              price={tokens[2].token + " " + parseFloat(lbalance[2]/1e18).toLocaleString('en')}
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
              price={tokens[3].token + " " + parseFloat(lbalance[3]/1e18).toLocaleString('en')}
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
              price={tokens[4].token + " " + parseFloat(lbalance[4]/1e18).toLocaleString('en')}
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
              price={tokens[5].token + " " + parseFloat(lbalance[5]/1e18).toLocaleString('en')}
              description="Gold on metal account can be deposited and withdrawn in bank office only"
              image="https://res.cloudinary.com/virtuoso/image/fetch/h_300,q_100,f_auto/https://ipfs.io/ipfs/QmTRUBh8JxTr3jfdYX2EVYUheVLHhGvUDRyCqhuZC1MTHc"
              key="Gold account Mint"

              />
        </Col>
        </Row>
      )}

    </div>
  );
};

export default Mint;
