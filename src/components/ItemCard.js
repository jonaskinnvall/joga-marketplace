import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Badge } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { useAuth0 } from '../Auth/Auth';
import { toggleStar, editItem, deleteItem } from '../actions/items';
import SVG from './icons/SVG';
import FormModal from './FormModal';

import '../css/ItemCard.css';

const ItemCard = ({ item }) => {
    const { loading, getTokenSilently } = useAuth0();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userState);
    const itemState = useSelector((state) => state.itemState);
    const [ModalShow, setModalShow] = useState(false);
    const [FormType, setFormType] = useState();
    const [itemReq, setItemReq] = useState({
        title: '',
        cat: '',
        desc: '',
        price: '',
        image: { imageURL: null, imageID: null },
    });

    // Clear form inputs after closing modal
    useEffect(() => {
        if (!ModalShow)
            setItemReq({
                title: '',
                cat: '',
                desc: '',
                price: '',
                image: { imageURL: null, imageID: null },
            });
    }, [ModalShow]);

    // Function to get correct item and dispatch toggleStar
    const starToggle = async (e) => {
        e.preventDefault();
        let token = await getTokenSilently();
        let userUpdate = { ...user };
        let id = itemState.findIndex((i) => i._id === item._id);

        let itemUpdate = { ...item };
        let starred = false;
        if (item.starredBy.includes(user.userID)) {
            starred = true;
        }

        dispatch(toggleStar(userUpdate, itemUpdate, token, starred, id));
    };

    // Dispatch item after image has been converted to base64 string if image is included
    useEffect(() => {
        if (typeof itemReq.image.imageURL === 'string' && !FormType) {
            dispatchItem();
            setModalShow(false);
        }
    }, [itemReq.image.imageURL]);

    // Function to dispatch item changes
    const dispatchItem = async () => {
        let token = await getTokenSilently();
        let id = itemState.findIndex((i) => i._id === item._id);
        let itemUpdate = { ...item };
        let itemUser = { ...user };

        itemUpdate = {
            ...itemUpdate,
            title: itemReq.title,
            category: itemReq.cat,
            desc: itemReq.desc,
            price: itemReq.price,
            image: itemReq.image,
        };
        await dispatch(editItem(itemUpdate, token, id, itemUser));
    };

    // Read file from form and convert to base64 string
    const readFile = () => {
        const reader = new FileReader();
        const image = itemReq.image.imageURL;

        reader.onloadend = () =>
            setItemReq({
                ...itemReq,
                image: { ...itemReq.image, imageURL: reader.result },
            });
        reader.readAsDataURL(image);
    };

    // Check if image is uploaded with item change,
    // if it is call readFile, if not go directly
    // to dispatch item
    const editItemCard = async (e) => {
        e.preventDefault();

        if (typeof itemReq.image.imageURL === 'object') {
            readFile();
        } else {
            dispatchItem();
            setModalShow(false);
        }
        setFormType();
    };

    // Get current card to delete and dispatch deleteItem
    const deleteItemCard = async () => {
        let token = await getTokenSilently();
        let id = itemState.findIndex((i) => i._id === item._id);
        let itemDelete = { ...item };
        let userUpdate = { ...user };

        await dispatch(deleteItem(userUpdate, itemDelete, token, id));
    };

    // Check if user is signed in, if so check which items are uploaded by said user
    // Users' items have a "edit button" while other items "star button" is made pressable
    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    {Object.keys(user).length === 0 ? (
                        <Card className="cards" border="info">
                            <Card.Header>
                                <Row className="card-row" as="h5">
                                    {item.title}
                                    <Button
                                        variant="outline-info"
                                        className="ml-auto"
                                        disabled
                                    >
                                        <SVG
                                            name="star-fill"
                                            width="1.5em"
                                            fill="#DEE600"
                                        />
                                        {'    '}
                                        <Badge>{item.stars}</Badge>
                                    </Button>
                                </Row>
                            </Card.Header>
                            <div className="card-img-div">
                                {item.image.imageURL ? (
                                    <Card.Img
                                        className="card-img"
                                        variant="top"
                                        src={item.image.imageURL}
                                    />
                                ) : (
                                    <></>
                                )}
                            </div>
                            <Card.Body>
                                <Row className="card-row">
                                    <Card.Subtitle>
                                        {item.category}
                                    </Card.Subtitle>
                                    {!item.price ? (
                                        <Card.Text>Price: 10kr</Card.Text>
                                    ) : (
                                        <Card.Text>
                                            Price: {item.price}kr
                                        </Card.Text>
                                    )}
                                </Row>
                                <Card.Text>{item.desc}</Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <Row className="card-row">
                                    <small className="text-muted">
                                        Posted:{' '}
                                        {item.creationDate.split('T')[0]}
                                    </small>
                                    <small className="text-muted">
                                        {' '}
                                        by {item.user}
                                    </small>
                                </Row>
                            </Card.Footer>
                        </Card>
                    ) : (
                        <Card className="cards" border="info">
                            <Card.Header>
                                <Row className="card-row" as="h5">
                                    {item.title}
                                    {item.userID === user.userID ? (
                                        <>
                                            <Button
                                                variant="outline-info"
                                                className="ml-auto"
                                                onClick={() => (
                                                    setModalShow(true),
                                                    setFormType('editItem'),
                                                    setItemReq({
                                                        ...itemReq,
                                                        title: item.title,
                                                        cat: item.category,
                                                        desc: item.desc,
                                                        price: item.price,
                                                        image: item.image,
                                                    })
                                                )}
                                            >
                                                {' '}
                                                <SVG
                                                    name="gear"
                                                    width="1.5em"
                                                />
                                            </Button>
                                            <Button
                                                variant="outline-info"
                                                disabled
                                            >
                                                <SVG
                                                    name="star-fill"
                                                    width="1.5em"
                                                    fill="#DEE600"
                                                />
                                                {'    '}
                                                <Badge>{item.stars}</Badge>
                                            </Button>
                                        </>
                                    ) : (
                                        <Button
                                            variant="outline-info"
                                            className="card-btn-row"
                                            onClick={starToggle}
                                        >
                                            {!item.starredBy.includes(
                                                user.userID
                                            ) ? (
                                                <SVG
                                                    name="star"
                                                    width="1.5em"
                                                />
                                            ) : (
                                                <SVG
                                                    name="star-fill"
                                                    width="1.5em"
                                                    fill="#DEE600"
                                                />
                                            )}

                                            {'    '}
                                            <Badge>
                                                {
                                                    itemState[
                                                        itemState.findIndex(
                                                            (i) =>
                                                                i._id ===
                                                                item._id
                                                        )
                                                    ].stars
                                                }
                                            </Badge>
                                        </Button>
                                    )}

                                    {FormType === 'editItem' && (
                                        <FormModal
                                            formType={FormType}
                                            confirm={editItemCard}
                                            deleteFunc={deleteItemCard}
                                            req={itemReq}
                                            onReq={setItemReq}
                                            show={ModalShow}
                                            onHide={() => (
                                                setModalShow(false),
                                                setFormType()
                                            )}
                                        />
                                    )}
                                </Row>
                            </Card.Header>
                            <div className="card-img-div">
                                {item.image.imageURL ? (
                                    <Card.Img
                                        className="card-img"
                                        variant="top"
                                        src={item.image.imageURL}
                                    />
                                ) : (
                                    <div />
                                )}
                            </div>
                            <Card.Body>
                                <Row className="card-row">
                                    <Card.Subtitle>
                                        {item.category}
                                    </Card.Subtitle>
                                    {!item.price ? (
                                        <Card.Text>Price: 10kr</Card.Text>
                                    ) : (
                                        <Card.Text>
                                            Price: {item.price}kr
                                        </Card.Text>
                                    )}
                                </Row>
                                <Card.Text>{item.desc}</Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <Row className="card-row">
                                    <small className="text-muted">
                                        Posted:{' '}
                                        {item.creationDate.split('T')[0]}
                                    </small>
                                    <small className="text-muted">
                                        {' '}
                                        by {item.user}
                                    </small>
                                </Row>
                            </Card.Footer>
                        </Card>
                    )}
                </>
            )}
        </>
    );
};

export default ItemCard;

ItemCard.propTypes = {
    item: PropTypes.object.isRequired,
};
