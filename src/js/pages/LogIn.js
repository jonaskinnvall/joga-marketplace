import React from "react";

import { Form, Button, Col, Row, Container } from "react-bootstrap";

class LogIn extends React.Component {
    render() {
        console.log("LogIn");
        return (
            <div>
                <h1>Login Page</h1>
                <Container>
                    <Row>
                        <Col>
                            <h2>Login with username and password</h2>
                            <Form>
                                <Form.Group controlId="formGroupEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                    />
                                </Form.Group>
                                <Form.Group controlId="formGroupPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicChecbox">
                                    <Form.Check
                                        type="checkbox"
                                        label="Remember Password"
                                    />
                                </Form.Group>
                            </Form>

                            <Form.Group as={Row}>
                                <Col sm={{ span: 10, offset: 2 }}>
                                    <Button type="submit">Sign in</Button>
                                </Col>
                            </Form.Group>
                        </Col>
                        <Col />
                    </Row>
                </Container>
            </div>
        );
    }
}

export default LogIn;
