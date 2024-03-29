import React, {useState} from "react";
import { useSelector} from "react-redux";
import api from "../../serverless/api";
import {Button, Row, Col} from "antd";
import MintMenuItem from './MintMenu';

import IntlMessages from "util/IntlMessages";

import { checkBalance } from "../../blockchain/metamask";

const { REACT_APP_VIRTUOSO_BRANCH, REACT_APP_LUSD, REACT_APP_LEUR, REACT_APP_LETH, REACT_APP_NETWORK_EXPLORER } = process.env;


const Mint = () => {

  const address = useSelector(({blockchain}) => blockchain.address);
  const virtuosoBalance = useSelector(({blockchain}) => blockchain.virtuosoBalance);
  const vb = virtuosoBalance/100;
  const LUSD = "LUSD " + vb.toFixed(2);

  const explorerLUSD = REACT_APP_NETWORK_EXPLORER + "address/" + REACT_APP_LUSD;
  const explorerLEUR = REACT_APP_NETWORK_EXPLORER + "address/" + REACT_APP_LEUR;
  const explorerLETH = REACT_APP_NETWORK_EXPLORER + "address/" + REACT_APP_LETH;
  

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
              creator="Approve LUSD Deposit"
              title="Your LUSD balance is"
              link={explorerLUSD}
              price={LUSD}
              description="LUSD token can be deposited and withdrawn thru SWIFT, Ethereum USDT and Tron USDT networks"
              image="https://res.cloudinary.com/virtuoso/image/fetch/h_300,q_100,f_auto/https://ipfs.io/ipfs/QmbARy1hHoHrW2mH3R2rkWKpUSayeQ77XKNA7aW5BVy1hE"
              key="LUSD Mint"

              />
        </Col>

      <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
            <MintMenuItem
              creator="Approve LUSD Withdraw"
              title="Your LEUR balance is"
              link={explorerLEUR}
              price="20,000"
              description="LEUR token can be deposited and withdrawn thru SWIFT"
              image="https://res.cloudinary.com/virtuoso/image/fetch/h_300,q_100,f_auto/https://ipfs.io/ipfs/QmR9W1QjKnTfKhBQCGDM53jQtbFZQJNmDDTPJcacoDpfYC"
              key="LEUR Mint"

              />
        </Col>

        <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
            <MintMenuItem
              creator="Safe Trading ETH"
              title="Your LETH balance is"
              link={explorerLETH}
              price="5.6574329"
              description="LETH token can be deposited and withdrawn thru Ethereum (ETH) and Polygon (WETH) networks"
              image="https://res.cloudinary.com/virtuoso/image/fetch/h_300,q_100,f_auto/https://ipfs.io/ipfs/QmecWSZmjyRzzfVEx4qksNL4Qde5JeQMwGvcqyyb6L3Rod"
              key="ETH Mint"

              />
        </Col>
        <Col xxl={8}  xl={8} lg={12} md={12} sm={24} xs={24}>
            <MintMenuItem
              creator="Safe Trading Bitcoin"
              title="Your LBTC balance is"
              price="0.57584397"
              description="BTC can be deposited and withdrawn thru Bitcoin, Ethereum (WBTC) and Polygon (WBTC) networks"
              image= "https://res.cloudinary.com/virtuoso/image/fetch/h_300,q_100,f_auto/https://ipfs.io/ipfs/QmPFVf47TupZ3VnC1HRd2ARwaEh8nogyE3ypaTs1V7ZDEk"
              key="BTC Mint"

              />
        </Col>
        <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
            <MintMenuItem
              creator="Safe Trading Gold"
              title="You hold receipts for"
              price="12.5 kg of gold"
              description="Gold warehouse receipts can be deposited and withdrawn in bank office only"
              image="https://res.cloudinary.com/virtuoso/image/fetch/h_300,q_100,f_auto/https://ipfs.io/ipfs/QmaLGsErRCMxpKX9PBjXfMPdhY8sce4SZw179juChiHCoo"
              key="Gold receipts Mint"

              />
        </Col>
                <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
            <MintMenuItem
              creator="Safe Trading Metal Account"
              title="Your gold account balance is"
              price="5210 grams"
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
