import React, {useState} from "react";
import IntlMessages from "util/IntlMessages";



const Payments = () => {


  return (
  <div className="gx-algolia-content-inner">

         <iframe
		  src="https://gnosis-safe.io/app/gor:0x8Db233eEbEc9286d89f56Fb7e623f3E29477876e/transactions/queue"
		  height="800px"
		  width="1000px"
		  key="safe-gnosis-goerli"
		  style={{
			border: 0,
			margin: 0,
			display: "block",
			borderRadius: "10px",
			maxWidth: "1200px",
			minWidth: "600px"}}
		/>

    </div>
  );
};

export default Payments;
