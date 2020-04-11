import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Col, Button } from 'react-bootstrap';

const PostItem = (props) => {
    console.log('MODAL!');
    console.log(props.req);
    const { post, req, onReq, ...rest } = props;
    return (
        <Modal
            {...rest}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {' '}
                    Fill out the form to add a new item
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={props.post}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Control
                                size="lg"
                                type="text"
                                placeholder="Title"
                                value={req.title}
                                onChange={(e) =>
                                    onReq({
                                        ...req,
                                        title: e.target.value,
                                    })
                                }
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Control
                                as="select"
                                value={req.cat}
                                onChange={(e) =>
                                    onReq({
                                        ...req,
                                        cat: e.target.value,
                                    })
                                }
                            >
                                <option>Category</option>
                                <option>Games</option>
                                <option>Toys</option>
                                <option>Furniture</option>
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Col>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Control
                                    as="textarea"
                                    rows="3"
                                    placeholder="Item Description"
                                    value={req.desc}
                                    onChange={(e) =>
                                        onReq({
                                            ...req,
                                            desc: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>
                        </Col>
                        <Col></Col>
                    </Form.Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="info" onClick={props.onHide}>
                    {' '}
                    Cancel
                </Button>
                <Button variant="info" onClick={post}>
                    {' '}
                    Post Item
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PostItem;

PostItem.propTypes = {
    post: PropTypes.func.isRequired,
    req: PropTypes.object.isRequired,
    onReq: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
};
