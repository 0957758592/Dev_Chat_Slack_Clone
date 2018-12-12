import React from "react";
import ReactDOM from "react-dom";
import Layout from "./containers/Layout";
import { Provider } from "react-redux";
import { store } from "./store";
// import * as serviceWorker from './serviceWorker';

import { BrowserRouter, Switch } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";
// import "./css/main.css";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Layout />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// serviceWorker.unregister();
