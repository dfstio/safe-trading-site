import React from "react";
import {Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";

const App = ({match}) => (
  <div className="gx-main-content-wrapper">
    <Switch>
       <Route path={`${match.url}tokens`} component={asyncComponent(() => import('./Tokens'))}/>
       <Route path={`${match.url}trading`} component={asyncComponent(() => import('./Trading'))}/>
       <Route path={`${match.url}payments`} component={asyncComponent(() => import('./Payments'))}/>
       <Route path={`${match.url}settings`} component={asyncComponent(() => import('./Settings'))}/>
       <Route path={`${match.url}deposits`} component={asyncComponent(() => import('./Deposits'))}/>
       <Route path={`${match.url}withdraws`} component={asyncComponent(() => import('./Withdraws'))}/>
    </Switch>
  </div>
);

export default App;
