import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {applyMiddleware, combineReducers, createStore, compose} from "redux";
import thunk from "redux-thunk";
import {authReducer} from "./store/reducers";
import App from "./App";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth: authReducer
}) 

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware()))

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById("root"));
