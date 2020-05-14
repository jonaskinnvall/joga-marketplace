import React from 'react';
import PropTypes from 'prop-types';
import { Form, InputGroup, Col } from 'react-bootstrap';

// Post item form used in FormModal
const PostItem = ({ req, onReq }) => {
    return (
        <Form encType="multipart/form-data">
            <Form.Row>
                <Form.Group as={Col} controlId="formTitle">
                    <Form.Label>Title</Form.Label>
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
                <Form.Group as={Col} controlId="formImage">
                    <Form.Label>Image of item</Form.Label>
                    <Form.File id="formFile" custom>
                        <Form.File.Input
                            onChange={(e) =>
                                onReq({
                                    ...req,
                                    image: {
                                        ...req.image,
                                        imageURL: e.target.files[0],
                                    },
                                })
                            }
                        />
                        <Form.File.Label data-browse="Add image ">
                            {req.image.imageURL && req.image.imageURL.name}
                        </Form.File.Label>
                    </Form.File>
                </Form.Group>
                <Form.Group as={Col} md="auto" controlId="formPrice">
                    <Form.Label>Desired price for item</Form.Label>
                    <InputGroup>
                        <Form.Control
                            type="text"
                            placeholder="Price (number)"
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
