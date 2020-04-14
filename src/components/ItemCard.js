import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Badge } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { useAuth0 } from '../Auth/Auth';
import { toggleStar, editItem } from '../actions/items';
import SVG from './icons/SVG';
import FormModal from './FormModal';

import '../css/ItemCard.css';
import puh from '../../images/Puh.jpg';

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
    });
    const [ModalShow, setModalShow] = useState(false);
    const [FormType, setFormType] = useState();

    // Clear form inputs after closing modal
    useEffect(() => {
        if (!ModalShow) setItemReq({ title: '', cat: '', desc: '', price: '' });
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

    const editItemCard = async (e) => {
        e.preventDefault();
        let token = await getTokenSilently();
        let id = itemState.findIndex((i) => i._id === item._id);
        let itemUpdate = { ...item };
        itemUpdate = {
            ...itemUpdate,
            title: itemReq.title,
            category: itemReq.cat,
            desc: itemReq.desc,
            price: itemReq.price,
        };

        await dispatch(editItem(itemUpdate, token, id));
        setModalShow(false);
        setFormType();
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
                                        className="card-btn-row"
                                        disabled
                                    >
                                        <SVG name="star-fill" width="1.5em" />
                                        {'    '}
                                        <Badge>{item.stars}</Badge>
                                    </Button>
                                </Row>
                            </Card.Header>
                            <div className="card-img-div">
                                <Card.Img
                                    className="card-img"
                                    variant="top"
                                    src={puh}
                                />
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
                                        <Button
                                            variant="outline-info"
                                            className="card-btn-row"
                                            onClick={() => (
                                                setModalShow(true),
                                                setFormType('editItem'),
                                                setItemReq({
                                                    title: item.title,
                                                    cat: item.category,
                                                    desc: item.desc,
                                                    price: item.price,
                                                })
                                            )}
                                        >
                                            {' '}
                                            <SVG name="gear" width="1.5em" />
                                        </Button>
                                    ) : (
                                        <></>
                                    )}

                                    {FormType === 'editItem' && (
                                        <FormModal
                                            formType={FormType}
                                            confirm={editItemCard}
                                            req={itemReq}
                                            onReq={setItemReq}
                                            show={ModalShow}
                                            onHide={() => (
                                                setModalShow(false),
                                                setFormType()
                                            )}
                                        />
                                    )}
                                    <Button
                                        variant="outline-info"
                                        className="card-btn-row"
                                        onClick={starToggle}
                                    >
                                        {!item.starredBy.includes(
                                            user.userID
                                        ) ? (
                                            <SVG name="star" width="1.5em" />
                                        ) : (
                                            <SVG
                                                name="star-fill"
                                                width="1.5em"
                                            />
                                        )}

                                        {'    '}
                                        <Badge>
                                            {
                                                itemState[
                                                    itemState.findIndex(
                                                        (i) =>
                                                            i._id === item._id
                                                    )
                                                ].stars
                                            }
                                        </Badge>
                                    </Button>
                                </Row>
                            </Card.Header>
                            <div className="card-img-div">
                                <Card.Img
                                    className="card-img"
                                    variant="top"
                                    src={user.image}
                                />
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
