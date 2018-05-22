import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Switch, Route} from "react-router-dom"
import {Provider} from "react-redux"

import Layout from "./components/Layout"
import store from "./store"

const app = document.getElementById('app');

ReactDOM.render(
    <Provider store = {store}>
        <Router>
            <Layout/>
        </Router>
    </Provider>, 
app)