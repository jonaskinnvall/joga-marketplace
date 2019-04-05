import React from "react";

import PropTypes from "prop-types";
import { Nav, Navbar, Button, Form, FormControl, Card } from "react-bootstrap";
import { LinkContainer, IndexLinkContainer } from "react-router-bootstrap";

//import Title from "./header/Title";
// import Search from "./header/Search"

class Header extends React.Component {
    handleChange(e) {
        const title = e.target.value;
        this.props.changeTitle(title);
    }

    handleClick = e => {};

    render() {
        return (
            <div className="d-flex flex-column">
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
                        <LinkContainer to="/login">
                            <Nav.Link>Sign In / Sign Up</Nav.Link>
                        </LinkContainer>
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

export default Header;
