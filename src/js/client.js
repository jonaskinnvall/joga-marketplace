import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Layout from "./pages/Layout"

const app = document.getElementById('app');

ReactDOM.render(
    <Router>
        <Layout/>
    </Router>, 
app)