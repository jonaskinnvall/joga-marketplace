import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "../pages/Home";
import Featured from "../pages/Featured";
import Categories from "../pages/Categories";
import Profile from "../pages/Profile";
import Callback from "./Callback.js";
// import history from "../history";

import auth0Client from "../Auth/Auth.js";
// import Layout from "../Layout";

const handleAuthentication = (nextState, replace) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
        auth0Client.handleAuthentication();
    }
};

class Main extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/featured" component={Featured} />
                <Route path="/categories" component={Categories} />
                {/* <Route path="/profile" component={Profile} /> */}

                <Route
                    path="/profile"
                    component={Profile}
                    render={props => <Profile auth={auth0Client} {...props} />}
                />
                <Route
                    path="/callback"
                    component={Callback}
                    render={props => {
                        handleAuthentication(props);
                        return <Callback {...props} />;
                    }}
                />
            </Switch>
        );
    }
}

export default Main;
