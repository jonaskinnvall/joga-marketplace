import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Col, Row, Button, Image } from 'react-bootstrap';

import { useAuth0 } from '../Auth/Auth';
import { editUser, deleteUserDB } from '../actions/users';
import { deleteAllItems } from '../actions/items';
import ItemGrid from './ItemGrid';
import FormModal from './FormModal';

import '../css/Profile.css';

const Profile = ({
    post,
    itemReq,
    setItemReq,
    ModalShow,
    setModalShow,
    FormType,
    setFormType,
}) => {
    const { loading, logout, getTokenSilently } = useAuth0();
    const dispatch = useDispatch();
    const userState = useSelector((state) => state.userState);
    const itemState = useSelector((state) => state.itemState);

    const [userInfo, setUserInfo] = useState({ favCat: '' });

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

    const editUserInfo = async (e) => {
        e.preventDefault();
        let token = await getTokenSilently();
        let userUpdate = { ...userState };

        userUpdate = {
            ...userUpdate,
            favCat: userInfo.favCat,
        };

        await dispatch(editUser(userUpdate, token));
        setModalShow(false);
        setFormType();
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
                                    <p>Starred items: 0</p>
                                ) : (
                                    <p>
                                        Starred items:{' '}
                                        {userState.starredItems.length}
                                    </p>
                                )}
                                {!userState.favCat ? (
                                    <p>Favorite category: None chosen</p>
                                ) : (
                                    <p>
                                        {' '}
                                        Favorite category: {userState.favCat}
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
                                            onClick={() => (
                                                setModalShow(true),
                                                setFormType('addItemProfile')
                                            )}
                                        >
                                            Add Item
                                        </Button>
                                        {FormType === 'addItemProfile' && (
                                            <FormModal
                                                formType={FormType}
                                                confirm={post}
                                                req={itemReq}
                                                onReq={setItemReq}
                                                show={ModalShow}
                                                onHide={() => (
                                                    setModalShow(false),
                                                    setFormType()
                                                )}
                                            />
                                        )}
                                    </Col>
                                    <Col>
                                        <Button
                                            variant="info"
                                            onClick={() => (
                                                setModalShow(true),
                                                setFormType('editUser')
                                            )}
                                        >
                                            Edit user
                                        </Button>
                                        {FormType === 'editUser' && (
                                            <FormModal
                                                formType={FormType}
                                                confirm={editUserInfo}
                                                req={userInfo}
                                                onReq={setUserInfo}
                                                show={ModalShow}
                                                onHide={() => (
                                                    setModalShow(false),
                                                    setFormType()
                                                )}
                                            />
                                        )}
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

Profile.propTypes = {
    post: PropTypes.func.isRequired,
    itemReq: PropTypes.object.isRequired,
    setItemReq: PropTypes.func.isRequired,
    ModalShow: PropTypes.bool.isRequired,
    setModalShow: PropTypes.func.isRequired,
    FormType: PropTypes.string,
    setFormType: PropTypes.func.isRequired,
};
