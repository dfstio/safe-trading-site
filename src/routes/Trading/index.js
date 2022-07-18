import React, {useState, useEffect, useCallback} from "react";
import { useDispatch, useSelector} from "react-redux";
import {updateSell, updateBuy} from "../../appRedux/actions";
import api from "../../serverless/api";
import {Card, Form, Radio} from "antd";


import IntlMessages from "util/IntlMessages";

import { addTokens, withdraw, deposit } from "../../blockchain/metamask";
const tokens = require("../../contract/tokens.json");
const descriptions = require("../../contract/descriptions.json");

const { REACT_APP_VIRTUOSO_BRANCH, REACT_APP_LUSD, REACT_APP_LEUR, REACT_APP_LETH, REACT_APP_NETWORK_EXPLORER } = process.env;

function frameSource(sell, buy)
{
	return "https://app.uniswap.org/#/swap?chain=polygon_mumbai&outputCurrency=" + 
					   tokens[buy].address + 
					   "&inputCurrency=" + 
					   tokens[sell].address;
}

const Trading = () => {

  const address = useSelector(({blockchain}) => blockchain.address);
  const sell = useSelector(({blockchain}) => blockchain.sell);
  const buy = useSelector(({blockchain}) => blockchain.buy);
  const dispatch = useDispatch();

  const frameSrc = frameSource(sell?sell:2, buy?buy:0);
  //const msg = tokens[sell?sell:2].token + "/" + tokens[buy?buy:0].token;

/*
      useEffect(() => {
            async function checkRadio() {
			   setFrameSrc(frameSource(sell, buy));
			   
        }
      checkRadio()
      },[buy, sell]);
*/
 			
    //const handleChange = (values) => {
   const handleChange = useCallback( async (values) => {

      if( values.sell !== undefined) dispatch(updateSell(values.sell));
      if( values.buy !== undefined)  dispatch(updateBuy(values.buy));
   });
	
  	 			

  return (
  <div className="gx-algolia-content-inner">
  <Card
        title={"Trade on UNISWAP"}
        bordered={false}
        >
    <Form
        onValuesChange = {handleChange}
        key="formuniswap"
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          sell: 2,
          buy: 0
        }}
      >
    {tokens.map(token=> (
        <Form.Item
            name="contract"
            key={"contract"+token.address}
            style={{"marginBottom": "0px", "marginTop": "0px", "marginLeft": "50px"}}
            >
        {"Safe Trading " + token.currency + " (" + token.token + "): " + token.address}
        </Form.Item>
     ))}

{/*}
      <Form.Item
            name="sellmsg"
            key="sellmsg"
            >
        Sell token:
        </Form.Item>
        <Form.Item name="sell" >
          <Radio.Group>
           {tokens.map(token=> (
            <Radio value={token.id}  key={token.id+"sellr"}>{token.token}</Radio>
         ))}
          </Radio.Group>
        </Form.Item>
        <Form.Item
            name="buymsg"
            key="buymsg"
            >
        Buy token:
        </Form.Item>
        <Form.Item name="buy" >
          <Radio.Group>
           {tokens.map(token=> (
            <Radio value={token.id}  key={token.id+"buyr"}>{token.token}</Radio>
         ))}
          </Radio.Group>
        </Form.Item>    
*/}            
    <Form.Item
	  key="uniswapfarme"
	  name="uniswapfarme"
    >
      <iframe
		  src={frameSrc}
		  height="660px"
		  width="100%"
		  key="uniswapst"
		  style={{
			border: 0,
			margin: 0,
			display: "block",
			borderRadius: "10px",
			maxWidth: "600px",
			minWidth: "300px"}}
		/>
	</Form.Item> 	
	</Form>	
      </Card>		
   </div>
  )
};

export default Trading;
