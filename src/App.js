import React, { useEffect } from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import { Nav, Navbar, Button, Form, FormControl } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import history from './history';
import { useAuth0 } from './Auth/Auth';
import { setUser } from './actions/users';

// Import App.css and component layouts
import './css/App.css';
import Home from './components/Home';
import Featured from './components/Featured';
import Profile from './js/components/Profile';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivRoute';

function App() {
    const {
        loading,
        isAuthenticated,
        loginWithRedirect,
        user,
        logout
    } = useAuth0();
    const dispatch = useDispatch();
    const stateUser = useSelector(state => state.user);

    useEffect(() => {
        console.log(user);
        if (!loading) {
            dispatch(setUser({ user }));
        }
        return;
    }, [loading]);

    return (
        <Router history={history}>
            {!loading ? (
                <div className="App">
                    <div className="App-header">
                        <Navbar bg="primary" variant="dark">
                            <Nav className="mr-auto">
                                <Navbar.Brand as={Link} to="/">
                                    <strong>JoGa</strong>
                                </Navbar.Brand>

                                <Nav.Link as={NavLink} to="/featured">
                                    {' '}
                                    Featured{' '}
                                </Nav.Link>
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
                                {isAuthenticated && stateUser ? (
                                    <Nav>
                                        <Nav.Link as={NavLink} to="/profile">
                                            <img
                                                src={stateUser.picture}
                                                alt="Profile"
                                            />{' '}
                                            {stateUser.given_name}
                                        </Nav.Link>

                                        <Nav.Link onClick={() => logout()}>
                                            Log Out
                                        </Nav.Link>
                                    </Nav>
                                ) : (
                                    <Nav.Link
                                        onClick={() => loginWithRedirect({})}
                                    >
                                        Log in
                                    </Nav.Link>
                                )}
                            </Nav>
                        </Navbar>
                        {/* </div> */}
                    </div>
                    <div className="App-main">
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/featured" component={Featured} />
                            <PrivateRoute path="/profile" component={Profile} />
                        </Switch>
                    </div>
                    <div className="App-footer">
                        <hr />
                        <Footer />
                    </div>
                </div>
            ) : (
                <div> Loading... </div>
            )}
        </Router>
    );
}
export default App;
