import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App";
import { Provider } from "react-redux";
import { store } from "./store";

import { BrowserRouter, Switch } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <App />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
