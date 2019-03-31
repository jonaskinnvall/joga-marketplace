import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "../pages/Home";
import Featured from "../pages/Featured";
import Categories from "../pages/Categories";
import LogIn from "../pages/LogIn";
import SignUp from "../pages/SignUp";

class Main extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/featured" component={Featured} />
                <Route path="/categories" component={Categories} />
                <Route path="/login" component={LogIn} />
                <Route path="/signup" component={SignUp} />
            </Switch>
        );
    }
}

export default Main;
