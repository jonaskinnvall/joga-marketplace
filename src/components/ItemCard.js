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

    const [itemReq, setItemReq] = useState({
        title: '',
        cat: '',
        desc: '',
        price: '',
        image: null,
    });
    const [ModalShow, setModalShow] = useState(false);
    const [FormType, setFormType] = useState();

    // Clear form inputs after closing modal
    useEffect(() => {
        if (!ModalShow)
            setItemReq({
                title: '',
                cat: '',
                desc: '',
                price: '',
                image: null,
            });
    }, [ModalShow]);

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

    useEffect(() => {
        if (typeof itemReq.image === 'string' && !FormType) {
            dispatchItem();
        }
    }, [itemReq.image]);

    const dispatchItem = async () => {
        let token = await getTokenSilently();
        let id = itemState.findIndex((i) => i._id === item._id);
        let itemUpdate = { ...item };

        itemUpdate = {
            ...itemUpdate,
            title: itemReq.title,
            category: itemReq.cat,
            desc: itemReq.desc,
            price: itemReq.price,
            image: itemReq.image,
        };
        await dispatch(editItem(itemUpdate, token, id));
    };

    const readFile = () => {
        const reader = new FileReader();
        const image = itemReq.image;

        reader.onloadend = () =>
            setItemReq({
                ...itemReq,
                image: reader.result,
            });
        reader.readAsDataURL(image);
    };

    const editItemCard = async (e) => {
        e.preventDefault();

        if (itemReq.image && typeof itemReq.image === 'object') {
            readFile();
        } else {
            dispatchItem();
        }
        setModalShow(false);
        setFormType();
    };

    const deleteItemCard = async () => {
        let token = await getTokenSilently();
        let id = itemState.findIndex((i) => i._id === item._id);
        let itemDelete = { ...item };
        let userUpdate = { ...user };

        await dispatch(deleteItem(userUpdate, itemDelete, token, id));
    };

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
                                        // className="card-btn-row"
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
                                {item.image && item.image.imageURL ? (
                                    <Card.Img
                                        className="card-img"
                                        variant="top"
                                        src={item.image.imageURL}
                                    />
                                ) : (
                                    <Card.Img
                                        className="card-img"
                                        variant="top"
                                        src={item.image}
                                    />
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
                                {item.image && item.image.imageURL ? (
                                    <Card.Img
                                        className="card-img"
                                        variant="top"
                                        src={item.image.imageURL}
                                    />
                                ) : (
                                    <Card.Img
                                        className="card-img"
                                        variant="top"
                                        src={item.image}
                                    />
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
