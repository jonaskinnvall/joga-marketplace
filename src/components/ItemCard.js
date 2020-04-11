import React from 'react';
import { Card, Button, Row, Badge } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { useAuth0 } from '../Auth/Auth';
import SVG from './icons/SVG';
import { toggleStar } from '../actions/items';

import '../css/ItemCard.css';
import puh from '../../images/Puh.jpg';

const ItemCard = ({ item }) => {
    const { loading, getTokenSilently } = useAuth0();
    const user = useSelector((state) => state.userState);
    const itemState = useSelector((state) => state.itemState);
    const dispatch = useDispatch();

    if (loading) {
        return <div>Loading...</div>;
    }

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

    return (
        <>
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
                    <div className="card-img-div">
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
                                onClick={starToggle}
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
                                                (i) => i._id === item._id
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
        </>
    );
};

export default ItemCard;

ItemCard.propTypes = {
    item: PropTypes.object.isRequired,
};
