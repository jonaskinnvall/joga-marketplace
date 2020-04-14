import React from 'react';
import PropTypes from 'prop-types';
import { Form, InputGroup, Col } from 'react-bootstrap';

const PostItem = ({ req, onReq }) => {
    return (
        <Form>
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
                <Form.Group controlId="formImage">
                    <Form.Label>Image upload</Form.Label>
                    <Form.File
                        as={Col}
                        id="formFile"
                        label="Add image of item (preferably landscape format)"
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
    );
};

export default PostItem;

PostItem.propTypes = {
    req: PropTypes.object.isRequired,
    onReq: PropTypes.func.isRequired,
};
