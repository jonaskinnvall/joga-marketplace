import React from "react";
import PropTypes from "prop-types";

import "../css/Layout.css";

import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import auth0Client from "./Auth/Auth";

// import Auth from "./Auth/Auth.js";

// const auth = new Auth();

class Layout extends React.Component {
    constructor() {
        super();
        this.state = { hasAuth: false };
    }

    // changeTitle(title) {
    //     this.setState({ title });
    // }

    // login() {
    //     auth.login();
    // };

    // logout() {
    //     auth.logout();
    //     this.props.setUser('');
    //     this.forceUpdate();
    // };

    componentDidMount() {
        // const { renewSession } = this.props.auth;

        // if (localStorage.getItem('isLoggedIn') === 'true') {
        //   renewSession();
        // }
        this.checkAuthentication();
    }

    checkAuthentication = () => {
        let authenticated = auth0Client.isAuthenticated();
        if (authenticated) {
            this.setState({ hasAuth: true });
        }
    };

    render() {
        const { location, history } = this.props;
        return (
            <div className="App">
                <div className="App-content">
                    <div className="App-header">
                        <Header
                            // changeTitle={this.changeTitle.bind(this)}
                            // title={this.state.title}
                            location={location}
                            history={history}
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
    location: PropTypes.object,
    history: PropTypes.object
};

export default Layout;
