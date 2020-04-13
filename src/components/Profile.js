import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Col, Row, Button, Image } from 'react-bootstrap';

import { useAuth0 } from '../Auth/Auth';
import { deleteUserDB } from '../actions/users';
import { addItem, deleteAllItems } from '../actions/items';
import ItemGrid from './ItemGrid';
import PostItem from './PostItem';

import '../css/Profile.css';

const Profile = () => {
    const { loading, logout, getTokenSilently } = useAuth0();
    const dispatch = useDispatch();
    const userState = useSelector((state) => state.userState);
    const itemState = useSelector((state) => state.itemState);
    const [itemReq, setItemReq] = useState({
        title: '',
        cat: '',
        desc: '',
        price: '',
    });
    const [PostItemShow, setPostItemShow] = useState(false);

    // Clear form inputs after closing modal
    useEffect(() => {
        if (!PostItemShow)
            setItemReq({ title: '', cat: '', desc: '', price: '' });
    }, [PostItemShow]);

    const postItem = async (e) => {
        e.preventDefault();
        let token = await getTokenSilently();
        let userUpdate = { ...userState };
        await dispatch(addItem(userUpdate, itemReq, token));
        setPostItemShow(false);
    };

    const deleteUser = async () => {
        let user = { ...userState };
        await dispatch(deleteUserDB(user));
        logout();
    };

    // JUST FOR NOW TO TEST AROUND: Function to delete all items in DB
    const deleteItems = () => {
        let user = { ...userState };
        dispatch(deleteAllItems(user));
    };

    return (
        <>
            {loading || !userState || !userState.creationDate ? (
                <div> Loading... </div>
            ) : (
                <Container className="cont" fluid>
                    <Row className="prof-row">
                        <Col className="user-col" xs={true}>
                            <div className="prof-img-div">
                                <Image
                                    className="prof-img"
                                    src={userState.image}
                                    rounded
                                />
                            </div>
                            <div className="info-div">
                                <h4 width="auto">{userState.name}</h4>
                                <p>Posted items: {userState.nrItems}</p>

                                {!Array.isArray(userState.starredItems) ||
                                !userState.starredItems.length ? (
                                    <p>Favorite items: 0</p>
                                ) : (
                                    <p>
                                        Favorite items:{' '}
                                        {userState.starredItems.length}
                                    </p>
                                )}
                                <p>
                                    Joined:{' '}
                                    {userState.creationDate.split('T')[0]}
                                </p>
                                <Row className="btn-row">
                                    <Col>
                                        <Button
                                            variant="info"
                                            onClick={() =>
                                                setPostItemShow(true)
                                            }
                                        >
                                            Add Item
                                        </Button>
                                        <PostItem
                                            post={postItem}
                                            req={itemReq}
                                            onReq={setItemReq}
                                            show={PostItemShow}
                                            onHide={() =>
                                                setPostItemShow(false)
                                            }
                                        />
                                    </Col>
                                    <Col>
                                        <Button variant="info">
                                            Edit user
                                        </Button>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col xs={9}>
                            {!Array.isArray(userState.postedItems) ||
                            !userState.postedItems.length ? (
                                <h1>You have not posted any items yet!</h1>
                            ) : (
                                <ItemGrid
                                    itemsFromState={itemState.filter((item) =>
                                        userState.postedItems.includes(item._id)
                                    )}
                                    title={'Your items'}
                                    rowLength={3}
                                />
                            )}

                            {!Array.isArray(userState.starredItems) ||
                            !userState.starredItems.length ? (
                                <h1>You have not starred any items yet!</h1>
                            ) : (
                                <ItemGrid
                                    itemsFromState={itemState.filter((item) =>
                                        userState.starredItems.includes(
                                            item._id
                                        )
                                    )}
                                    title={'Your favorite items'}
                                    rowLength={3}
                                />
                            )}
                            <>
                                <button onClick={deleteUser}>
                                    Delete user
                                </button>
                            </>
                            <>
                                <button onClick={deleteItems}>
                                    Delete items
                                </button>
                            </>
                        </Col>
                    </Row>
                </Container>
            )}
        </>
    );
};

export default Profile;
