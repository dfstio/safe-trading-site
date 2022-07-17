import React from "react";
import {Card} from "antd";

const {Meta} = Card;



const MintMenuItem = ({ title, creator, description, balance, link, image, number,addTokens }) => {
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

      <div className="gx-product-name">
      <p>{description}</p>
        <Meta
        title={title}
        description={balance}
      />
      </div>
    </Card>
    </div>

  );
};

export default MintMenuItem;

