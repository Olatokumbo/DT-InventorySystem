import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./store/reducers";
import auth from "./firebase/firebase";
import * as actionTypes from "./store/actions/actionsTypes";
import Loading from "./pages/Loading/Loading";
import App from "./App";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(<Loading />, document.getElementById("root"));

auth.onAuthStateChanged((user) => {
    ReactDOM.render(
        <Provider store={store}>
          <App />
        </Provider>,
        document.getElementById("root")
      );
  if (user) {
    console.log("Logged In");
    store.dispatch({ type: actionTypes.SIGNIN_SUCCESS, uid: user.uid });
  } else {
    console.log("Logged Out");
  }
});
