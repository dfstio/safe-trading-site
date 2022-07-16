import React, {useState} from "react";
import { useSelector} from "react-redux";
import api from "../../serverless/api";
import {Button, Row, Col} from "antd";
import MintMenuItem from './MintMenu';

import IntlMessages from "util/IntlMessages";

const { REACT_APP_VIRTUOSO_BRANCH } = process.env;


const Mint = () => {

  const address = useSelector(({blockchain}) => blockchain.address);


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
              title="Your USD balance is"
              link="/mint/butterflies"
              price="10,000"
              description="LUSD token can be deposited and withdrawn thru SWIFT, Ethereum USDT and Tron USDT networks"
              image="https://res.cloudinary.com/virtuoso/image/fetch/h_300,q_100,f_auto/https://ipfs.io/ipfs/QmbARy1hHoHrW2mH3R2rkWKpUSayeQ77XKNA7aW5BVy1hE"
              key="LUSD Mint"

              />
        </Col>

      <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
            <MintMenuItem
              creator="Safe Trading EUR"
              title="Your EUR balance is"
              link="/mint/custom"
              price="20,000"
              description="LEUR token can be deposited and withdrawn thru SWIFT"
              image="https://res.cloudinary.com/virtuoso/image/fetch/h_300,q_100,f_auto/https://content.nftvirtuoso.io/image/mintimages/private.png"
              key="LEUR Mint"

              />
        </Col>

        <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
            <MintMenuItem
              creator="Safe Trading ETH"
              title="Your ETH balance is"
              price="5.6574329"
              description="LETH token can be deposited and withdrawn thru Ethereum (ETH) and Polygon (WETH) networks"
              image="https://res.cloudinary.com/virtuoso/image/fetch/h_300,q_100,f_auto/https://ipfs.io/ipfs/QmQAGbHxf9q1p1ocsp12LKtwMV8msYGW6N4A9yiGSovuiS"
              key="ETH Mint"

              />
        </Col>
        <Col xxl={8}  xl={8} lg={12} md={12} sm={24} xs={24}>
            <MintMenuItem
              creator="Bitcoin"
              title="Your BTC balance is"
              price="0.57584397"
              description="BTC can be deposited and withdrawn thru Bitcoin, Ethereum (WBTC) and Polygon (WBTC) networks"
              image= "https://res.cloudinary.com/virtuoso/image/fetch/h_300,q_100,f_auto/https://ipfs.io/ipfs/QmdLdqRJZ2T4bdPJhZBkXGgovgqXe6z58xwCTqdUygeQxi"
              key="BTC Mint"

              />
        </Col>
        <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
            <MintMenuItem
              creator="Gold warehouse receipts"
              title="You hold receipts for"
              price="12.5 kg of gold"
              description="Gold can be deposited and withdrawn in bank office only"
              image="https://res.cloudinary.com/virtuoso/image/fetch/h_300,q_100,f_auto/https://content.nftvirtuoso.io/image/mintimages/dokar.jpg"
              key="Gold receipts Mint"

              />
        </Col>
                <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
            <MintMenuItem
              creator="Gold on metal account"
              title="Your gold account balance is"
              price="5210 grams"
              description="Gold on account can be deposited and withdrawn in bank office only"
              image="https://res.cloudinary.com/virtuoso/image/fetch/h_300,q_100,f_auto/https://content.nftvirtuoso.io/image/mintimages/deepnft.jpg"
              key="Gold account Mint"

              />
        </Col>
        </Row>
      )}

    </div>
  );
};

export default Mint;
