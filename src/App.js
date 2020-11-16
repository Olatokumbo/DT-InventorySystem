import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./hoc/PrivateRoute";
import {Signin} from "./pages";
import "./App.css";
const App = () => {
  return (
    <Router>
      <Switch>
      <Route exact path="/" component={Signin}/>
      <PrivateRoute path="/home" component={Signin} />
      </Switch>
    </Router>
  );
};

export default App;
