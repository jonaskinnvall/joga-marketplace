import React from "react";

import { withRouter } from "react-router-dom";
import { Nav, Navbar, Button, Form, FormControl } from "react-bootstrap";
import { LinkContainer, IndexLinkContainer } from "react-router-bootstrap";

import PropTypes from "prop-types";

//import Title from "./header/Title";
// import Search from "./header/Search"
import history from "../history.js";

import auth0Client from "../Auth/Auth.js";

class Header extends React.Component {
    handleChange(e) {
        const title = e.target.value;
        this.props.changeTitle(title);
    }

    handleClick = e => {};

    login = () => {
        auth0Client.login();
    };

    logout = () => {
        auth0Client.logout();
        history.replace("/");
        // this.props.history.replace("/");
    };

    render() {
        return (
            <div className=" d-flex flex-column">
                <Navbar bg="primary" variant="dark">
                    {/* <Nav className="align-items-start"> */}
                    <Nav className="mr-auto">
                        <IndexLinkContainer to="/">
                            <Navbar.Brand>
                                <strong>JoGa</strong>
                            </Navbar.Brand>
                        </IndexLinkContainer>
                        <LinkContainer to="/featured">
                            <Nav.Link> Featured </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/categories">
                            <Nav.Link> Categories </Nav.Link>
                        </LinkContainer>
                    </Nav>
                    {/* <Nav className="align-items-center"> */}
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
                    {/* <Nav className="align-items-end"> */}
                    <Nav className="ml-auto">
                        {/* <LinkContainer to="/login"> */}
                        {!auth0Client.isAuthenticated && (
                            <Nav.Link onClick={this.login.bind(this)}>
                                Sign In / Sign Up
                            </Nav.Link>
                        )}
                        {auth0Client.isAuthenticated && (
                            <Nav>
                                <LinkContainer to="/profile">
                                    <Nav.Link>
                                        {/* {" "}
                                        {auth0Client.getProfile().name}{" "} */}
                                        Profile
                                    </Nav.Link>
                                </LinkContainer>
                                <Nav.Link onClick={this.logout.bind(this)}>
                                    Sign Out
                                </Nav.Link>
                            </Nav>
                        )}
                        {/* </LinkContainer> */}
                        {/* <Button variant="link" onClick={this.handleClick}>Link</Button>
                             <Card
                                 bg="primary"
                                 text="white"
                                 style={{ width: "18rem" }}
                             >
                                 <Card.Header>Header</Card.Header>
                                 <Card.Body>
                                     <Card.Title>Primary Card Title</Card.Title>
                                     <Card.Text>
                                         Some quick example text to build on the
                                         card title and make up the bulk of the
                                         cards content.
                                     </Card.Text>
                                 </Card.Body>
                             </Card>
                         <br /> */}
                    </Nav>
                </Navbar>
            </div>
        );
    }
}

Header.propTypes = {
    changeTitle: PropTypes.func,
    title: PropTypes.string,
    location: PropTypes.any,
    collapsed: PropTypes.bool
};

export default withRouter(Header);
