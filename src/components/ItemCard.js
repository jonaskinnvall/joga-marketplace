import React from 'react';
import { Card, Button, Row, Badge } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { useAuth0 } from '../Auth/Auth';
import SVG from './icons/SVG';
import { editItem } from '../actions/items';

import '../css/ItemCard.css';
import puh from '../../images/Puh.jpg';

const ItemCard = ({ item }) => {
    const { loading, getTokenSilently } = useAuth0();
    const user = useSelector(state => state.userState);
    const itemState = useSelector(state => state.itemState);
    const dispatch = useDispatch();

    if (loading) {
        return <div>Loading...</div>;
    }

    const toggleStar = async e => {
        e.preventDefault();
        let token = await getTokenSilently();
        let userUpdate = { ...user };
        let itemUpdate = { ...item };
        let starred = false;
        if (!item.starredBy.includes(user.userID)) {
            itemUpdate.starredBy.push(user.userID);
            itemUpdate.stars++;
        } else {
            itemUpdate.starredBy.pop(user.userID);
            // itemUpdate = itemState.filter(item => item._id != itemID);
            itemUpdate.stars--;

            starred = true;
        }

        dispatch(editItem(userUpdate, itemUpdate, token, starred));
    };

    return (
        <div>
            {Object.keys(user).length === 0 ? (
                <Card className="cards" border="info">
                    <Card.Header>
                        <Row className="card-row" as="h2">
                            {item.title}
                            <Button
                                variant="outline-info"
                                className="btn-row"
                                disabled
                            >
                                <SVG name="star-fill" width="1.5em" />
                                {'    '}
                                <Badge>{item.stars}</Badge>
                            </Button>
                        </Row>
                    </Card.Header>
                    <div className="img-div">
                        <Card.Img
                            className="card-img"
                            variant="top"
                            src={puh}
                        />
                    </div>
                    <Card.Body>
                        <Row className="card-row">
                            <Card.Subtitle>{item.category}</Card.Subtitle>
                            <Card.Text>Price: $.99</Card.Text>
                        </Row>
                        <Card.Text>{item.desc}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Row className="card-row">
                            <small className="text-muted">
                                Posted: {item.creationDate.split('T')[0]}
                            </small>
                            <small className="text-muted">
                                {' '}
                                by {item.user}
                            </small>
                        </Row>
                    </Card.Footer>
                </Card>
            ) : (
                <Card
                    className="cards"
                    border="info"
                    style={{ width: '24rem' }}
                >
                    <Card.Header>
                        <Row className="card-row" as="h2">
                            {item.title}
                            <Button
                                variant="outline-info"
                                className="btn-row"
                                onClick={toggleStar}
                            >
                                {!item.starredBy.includes(user.userID) ? (
                                    <SVG name="star" width="1.5em" />
                                ) : (
                                    <SVG name="star-fill" width="1.5em" />
                                )}

                                {'    '}
                                <Badge>
                                    {
                                        itemState[
                                            itemState.findIndex(
                                                i => i._id === item._id
                                            )
                                        ].stars
                                    }
                                </Badge>
                            </Button>
                        </Row>
                    </Card.Header>
                    <div className="img-div">
                        <Card.Img
                            className="card-img"
                            variant="top"
                            src={user.image}
                        />
                    </div>
                    <Card.Body>
                        <Row className="card-row">
                            <Card.Subtitle>{item.category}</Card.Subtitle>
                            <Card.Text>Price: $.99</Card.Text>
                        </Row>
                        <Card.Text>{item.desc}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Row className="card-row">
                            <small className="text-muted">
                                Posted: {item.creationDate.split('T')[0]}
                            </small>
                            <small className="text-muted">
                                {' '}
                                by {item.user}
                            </small>
                        </Row>
                    </Card.Footer>
                </Card>
            )}
        </div>
    );
};

export default ItemCard;

ItemCard.propTypes = {
    item: PropTypes.object.isRequired
};
