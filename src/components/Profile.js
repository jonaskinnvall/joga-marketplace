import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Col } from 'react-bootstrap';

import { useAuth0 } from '../Auth/Auth';
import { deleteUserDB } from '../actions/users';
import { addItem, deleteAllItems } from '../actions/items';

const Profile = () => {
    const { loading, logout, getTokenSilently } = useAuth0();
    const dispatch = useDispatch();
    const userState = useSelector(state => state.userState.user);
    // const itemState = useSelector(state => state.itemState.items);
    const [itemReq, setItemReq] = useState({ title: '', cat: '', desc: '' });
    if (loading || !userState) {
        return <div>Loading...</div>;
    }

    const postItem = async e => {
        e.preventDefault();
        let token = await getTokenSilently();
        let userUpdate = { ...userState };
        dispatch(addItem(userUpdate, itemReq, token));
    };

    // JUST FOR NOW TO TEST AROUND: Function to delete user in DB
    const deleteUser = () => {
        let user = { ...userState };
        dispatch(deleteUserDB(user));
        logout();
    };

    const deleteItems = () => {
        dispatch(deleteAllItems());
    };

    return (
        <div>
            <div>
                <Form onSubmit={postItem}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Control
                                size="lg"
                                type="text"
                                placeholder="Title"
                                value={itemReq.title}
                                onChange={e =>
                                    setItemReq({
                                        ...itemReq,
                                        title: e.target.value
                                    })
                                }
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Control
                                as="select"
                                value={itemReq.cat}
                                onChange={e =>
                                    setItemReq({
                                        ...itemReq,
                                        cat: e.target.value
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
                                    value={itemReq.desc}
                                    onChange={e =>
                                        setItemReq({
                                            ...itemReq,
                                            desc: e.target.value
                                        })
                                    }
                                />
                            </Form.Group>
                        </Col>
                        <Col></Col>
                    </Form.Row>
                    <Button variant="info" type="submit">
                        Post item
                    </Button>
                </Form>
            </div>
            <div>
                <button onClick={deleteUser}>Delete user</button>
            </div>
            <div>
                <button onClick={deleteItems}>Delete items</button>
            </div>
            <div>
                <h2>{userState.nrItems}</h2>
            </div>
            <Fragment>
                <img src={userState.image} alt="Profile" />
                <h2>{userState.name}</h2>
            </Fragment>
        </div>
    );
};

export default Profile;
