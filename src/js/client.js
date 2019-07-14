import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";

import Layout from "./Layout";
import store from "./store";
// import history from "./history";

const app = document.getElementById("app");

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Layout />
        </Router>
    </Provider>,
    app
);
