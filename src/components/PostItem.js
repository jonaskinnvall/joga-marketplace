import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Col, Button, InputGroup } from 'react-bootstrap';

const PostItem = (props) => {
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
                    Fill out the form to post a new item
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={props.post}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formTitle">
                            <Form.Label as="h5">Title</Form.Label>
                            <Form.Control
                                size="lg"
                                type="text"
                                placeholder="Name of item"
                                value={req.title}
                                onChange={(e) =>
                                    onReq({
                                        ...req,
                                        title: e.target.value,
                                    })
                                }
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formCategory">
                            <Form.Label>Categories</Form.Label>
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
                                <option>Choose category for item</option>
                                <option>Games</option>
                                <option>Toys</option>
                                <option>Furniture</option>
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group>
                            <Form.Label>Image upload</Form.Label>
                            <Form.File
                                as={Col}
                                id="formFile"
                                label="Add image of item"
                                custom
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formPrice">
                            <Form.Label>Price</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    placeholder="Input desired price for item (number)"
                                    value={req.price}
                                    onChange={(e) =>
                                        onReq({
                                            ...req,
                                            price: e.target.value,
                                        })
                                    }
                                />

                                <InputGroup.Append>
                                    <InputGroup.Text>kr</InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="formDesc">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows="3"
                            placeholder="Describe the item with a short text"
                            value={req.desc}
                            onChange={(e) =>
                                onReq({
                                    ...req,
                                    desc: e.target.value,
                                })
                            }
                        />
                    </Form.Group>
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
