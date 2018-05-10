import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Layout from "./pages/Layout"
// import Featured from "./pages/Featured"
// import Categories from "./pages/Categories"


const app = document.getElementById('app');


// ReactDOM.render(<Layout/>, app)

ReactDOM.render(
    <Router>
        <Layout/>
    </Router>, 
app)