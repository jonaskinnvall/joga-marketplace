import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import { Nav, Navbar, Button, Form, FormControl } from 'react-bootstrap';

import history from './history';
import { useAuth0 } from './Auth/Auth';

// Import App.css and component layouts
import '../css/App.css';
import Home from './components/Home';
import Featured from './components/Featured';
import Profile from './components/Profile';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivRoute';

function App() {
    const { loading, isAuthenticated, loginWithRedirect, logout } = useAuth0();

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Router history={history}>
            <div className="App">
                <div className="App-header">
                    {/* <div className=" d-flex flex-column"> */}
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
                                <Button variant="outline-light">Search</Button>
                            </Form>
                        </Nav>
                        <Nav className="ml-auto">
                            {!isAuthenticated && (
                                <Nav.Link onClick={() => loginWithRedirect({})}>
                                    Log in
                                </Nav.Link>
                            )}
                            {isAuthenticated && (
                                <Nav>
                                    <Nav.Link as={NavLink} to="/profile"> 
                                        Profile {/* TODO: Put users name or picture here?*/ }
                                    </Nav.Link>

                                    <Nav.Link onClick={() => logout()}>
                                        Log Out
                                    </Nav.Link>
                                </Nav>
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
        </Router>
    );
}
export default App;
