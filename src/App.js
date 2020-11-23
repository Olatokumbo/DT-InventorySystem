import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./hoc/PrivateRoute";
import PublicRoute from "./hoc/PublicRoute";
import {Signin, Home, Request, Transaction, Requests, AssetInfo} from "./pages";
import "./App.css";
const App = () => {
  return (
    <Router>
      <Switch>
      <Route exact path="/" component={Signin}/>
      <PrivateRoute path="/home" component={Home} />
      <Route path="/transaction" component={Transaction}/>
      <Route path="/request" component={Request}/>
      <PrivateRoute path="/asset/view/:assetId" component={AssetInfo}/>
      <PrivateRoute path="/requests" component={Requests}/>
      </Switch>
    </Router>
  );
};

export default App;
