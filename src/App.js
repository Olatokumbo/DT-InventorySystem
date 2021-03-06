import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./hoc/PrivateRoute";
import PublicRoute from "./hoc/PublicRoute";
import {Signin, Home, Request, Transaction, Requests, AssetInfo, ExpiredRequests, AssetsOffsite, Menu} from "./pages";
import "./App.css";
const App = () => {
  return (
    <Router>
      <Switch>
      <PublicRoute exact path="/" component={Signin}/>
      <PrivateRoute path="/inventory" component={Home} />
      <PrivateRoute path="/home" component={Menu} />
      <Route path="/transaction" component={Transaction}/>
      <Route path="/request" component={Request}/>
      <PrivateRoute path="/asset/view/:assetId" component={AssetInfo}/>
      <PrivateRoute path="/requests" component={Requests}/>
      <PrivateRoute path="/report/expired" component={ExpiredRequests}/>
      <PrivateRoute path="/report/out" component={AssetsOffsite}/>
      </Switch>
    </Router>
  );
};

export default App;
