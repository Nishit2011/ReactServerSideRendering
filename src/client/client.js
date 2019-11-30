import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";

//will help to show what component to render prior to rendering it
import { renderRoutes } from "react-router-config";
import { createBrowserHistory } from "history";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import reducers from "./reducers";
import axios from "axios";

const axiosInstance = axios.create({
  baseUrl: "/api"
});

const store = createStore(
  reducers,
  window.INITIAL_STATE,
  applyMiddleware(thunk.withExtraArgument(axiosInstance))
);
const history = createBrowserHistory();

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter history={history}>
      <div>{renderRoutes(Routes)}</div>
    </BrowserRouter>
  </Provider>,
  document.querySelector("#root")
);
