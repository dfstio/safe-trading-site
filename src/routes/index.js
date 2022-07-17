import React from "react";
import {Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";

const App = ({match}) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      //<Route path={`${match.url}marketplace`} component={asyncComponent(() => import('./algolia'))}/>
      // <Route path={`${match.url}mint/custom`} component={asyncComponent(() => import('./Mint/Custom'))}/>
      // <Route path={`${match.url}mint/butterflies`} component={asyncComponent(() => import('./Mint/Butterflies'))}/>
       <Route path={`${match.url}tokens`} component={asyncComponent(() => import('./Tokens'))}/>
       <Route path={`${match.url}trading`} component={asyncComponent(() => import('./Trading'))}/>
       <Route path={`${match.url}payments`} component={asyncComponent(() => import('./Payments'))}/>
       <Route path={`${match.url}admin`} component={asyncComponent(() => import('./Admin'))}/>
      // <Route path={`${match.url}settings`} component={asyncComponent(() => import('./Settings'))}/>
      // <Route path={`${match.url}token/:chainId/:contract/:tokenId`} component={asyncComponent(() => import('./token'))}/>
    </Switch>
  </div>
);

export default App;
