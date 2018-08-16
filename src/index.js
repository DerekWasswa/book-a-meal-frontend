import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.css";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { applicationReducers } from "./reducers/combine-reducers";
import JwtDecode from "jwt-decode";
import { loginUser } from "./actions/authentication";

const store = createStore(applicationReducers, applyMiddleware(thunk));

const appAccessToken = localStorage.getItem("app-access-token");
if (appAccessToken) {
  const user = JwtDecode(appAccessToken);
  store.dispatch(loginUser({ ...user, logInStatus: true }));
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
