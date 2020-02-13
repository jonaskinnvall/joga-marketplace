import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Nav, Navbar, Button, Form, FormControl } from 'react-bootstrap';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';

import '../css/App.css';

import history from './history';
import Auth from './Auth/Auth';

import Home from './components/Home';
import Featured from './components/Featured';
import Profile from './components/Profile';
import Callback from './components/Callback';
import Footer from './components/Footer';

const auth = new Auth();

const handleAuthentication = ({ location }) => {
    console.log('handleAuth', location);
    if (/access_token|id_token|error/.test(location.hash)) {
        auth.handleAuthentication();
    }
};

class App extends Component {
    constructor() {
        super();
        this.state = { isAuth: false };
    }

    componentDidMount() {
        console.log(auth);
        console.log('Profile', auth.userProfile);
        console.log('AccessToken2', auth.accessToken);
        console.log('AccessToken2', auth['accessToken']);
        let accessTok = auth.accessToken;
        console.log('acc', accessTok);

        if (auth.isAuthenticated()) {
            this.setState({ isAuth: true });
        }

        if (localStorage.getItem('isLoggedIn') === 'true') {
            console.log('Renewing session');
            auth.renewSession();
        }
    }

    handleLogin = () => {
        auth.login();
    };

    handleLogout = () => {
        auth.logout();
    };
    render() {
        // const { isAuthenticated } = auth.isAuthenticated;
        return (
            <Router history={history}>
                <div className="App">
                    <div className="App-header">
                        <div className=" d-flex flex-column">
                            <Navbar bg="primary" variant="dark">
                                <Nav className="mr-auto">
                                    <IndexLinkContainer to="/">
                                        <Navbar.Brand>
                                            <strong>JoGa</strong>
                                        </Navbar.Brand>
                                    </IndexLinkContainer>
                                    <LinkContainer to="/featured">
                                        <Nav.Link> Featured </Nav.Link>
                                    </LinkContainer>
                                </Nav>
                                <Nav className="mx-auto">
                                    <Form inline>
                                        <FormControl
                                            type="text"
                                            placeholder="Search"
                                            className="mr-sm-2"
                                        />
                                        <Button variant="outline-light">
                                            Search
                                        </Button>
                                    </Form>
                                </Nav>
                                <Nav className="ml-auto">
                                    {!this.state.isAuth && (
                                        <Nav.Link
                                            onClick={this.handleLogin.bind(
                                                this
                                            )}
                                        >
                                            Sign In / Sign Up
                                        </Nav.Link>
                                    )}
                                    {this.state.isAuth && (
                                        <Nav>
                                            <LinkContainer to="/profile">
                                                <Nav.Link>Profile</Nav.Link>
                                            </LinkContainer>
                                            <Nav.Link
                                                onClick={this.handleLogout.bind(
                                                    this
                                                )}
                                            >
                                                Sign Out
                                            </Nav.Link>
                                        </Nav>
                                    )}
                                </Nav>
                            </Navbar>
                        </div>
                    </div>
                    <div className="App-main">
                        <Switch>
                            <Route
                                exact
                                path="/"
                                component={props => (
                                    <Home auth={auth} {...props} />
                                )}
                            />
                            <Route path="/featured" component={Featured} />
                            <Route
                                path="/profile"
                                render={props => (
                                    <Profile auth={auth} {...props} />
                                )}
                            />
                            <Route
                                path="/callback"
                                render={props => {
                                    console.log('callback props', props);
                                    handleAuthentication(props);
                                    return <Callback {...props} />;
                                }}
                            />
                        </Switch>
                    </div>
                    <div className="App-footer">
                        <hr />
                        <Footer />
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
