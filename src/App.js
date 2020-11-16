import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./hoc/PrivateRoute";
import PublicRoute from "./hoc/PublicRoute";
import {Signin, Home, Request} from "./pages";
import "./App.css";
const App = () => {
  return (
    <Router>
      <Switch>
      <Route exact path="/" component={Signin}/>
      <PrivateRoute path="/home" component={Home} />
      <Route path="/request" component={Request}/>
      </Switch>
    </Router>
  );
};

export default App;
