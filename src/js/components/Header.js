import React from "react";

import PropTypes from "prop-types";
import { Nav, Navbar, Button, Form, FormControl } from "react-bootstrap";
import { LinkContainer, IndexLinkContainer } from "react-router-bootstrap";

//import Title from "./header/Title";
// import Search from "./header/Search"

class Header extends React.Component {
    handleChange(e) {
        const title = e.target.value;
        this.props.changeTitle(title);
    }

    render() {
        return (
            <div>
                <Navbar bg="primary" variant="dark">
                    <IndexLinkContainer to="/">
                        <Navbar.Brand>
                            <strong>JoGa</strong>
                        </Navbar.Brand>
                    </IndexLinkContainer>
                    <Nav className="mr-auto">
                        <LinkContainer to="/featured">
                            <Nav.Link> Featured </Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/categories">
                            <Nav.Link> Categories </Nav.Link>
                        </LinkContainer>
                    </Nav>
                    <Form inline>
                        <FormControl
                            type="text"
                            placeholder="Search"
                            className="mr-sm-2"
                        />
                        <Button variant="outline-light">Search</Button>
                    </Form>
                    <Nav className="ml-auto">
                        <LinkContainer to="/login">
                            <Nav.Link>Login</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/signup">
                            <Nav.Link>Sign Up</Nav.Link>
                        </LinkContainer>
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

export default Header;
