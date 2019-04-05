import React from "react";
import PropTypes from "prop-types";

import "../css/Layout.css";

import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Callback from "./components/Callback";

// import Auth from "./Auth/Auth.js";

// const auth = new Auth();

class Layout extends React.Component {
    constructor() {
        super();
        this.state = { title: "Search" };
    }

    changeTitle(title) {
        this.setState({ title });
    }

    // login() {
    //     auth.login();
    // };

    // logout() {
    //     auth.logout();
    //     this.props.setUser('');
    //     this.forceUpdate();
    // };

    render() {
        const { location } = this.props;
        return (
            <div className="App">
                <div className="App-content">
                    <div className="App-header">
                        <Header
                            changeTitle={this.changeTitle.bind(this)}
                            title={this.state.title}
                            location={location}
                        />
                    </div>
                    <div className="App-main">
                        <Main />
                    </div>
                    <div className="App-footer">
                        <hr />
                        <Footer />
                    </div>
                </div>
            </div>
        );
    }
}

Layout.propTypes = {
    location: PropTypes.any
};

export default Layout;
