import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

const EditUser = ({ req, onReq }) => {
    return (
        <Form>
            <Form.Group controlId="formCategory">
                <Form.Label>Favorite Category</Form.Label>
                <Form.Control
                    as="select"
                    value={req.favCat}
                    onChange={(e) =>
                        onReq({
                            ...req,
                            favCat: e.target.value,
                        })
                    }
                >
                    <option>Choose your favorite category</option>
                    <option>Games</option>
                    <option>Toys</option>
                    <option>Furniture</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="formImage">
                <Form.Label>Change Image</Form.Label>
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
                    <Form.File.Label data-browse="Change profile picture ">
                        {req.image.imageURL && req.image.imageURL.name}
                    </Form.File.Label>
                </Form.File>
            </Form.Group>
        </Form>
    );
};

export default EditUser;

EditUser.propTypes = {
    req: PropTypes.object.isRequired,
    onReq: PropTypes.func.isRequired,
};
