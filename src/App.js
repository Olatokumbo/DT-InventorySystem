import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {Signin} from "./pages";
import "./App.css";
const App = () => {
  return (
    <Router>
      <Switch>
      <Route path="/" component={Signin}/>
      </Switch>
    </Router>
  );
};

export default App;
