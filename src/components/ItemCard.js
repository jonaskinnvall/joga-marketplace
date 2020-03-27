import React from 'react';
import { Card, Button, Row, Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import '../css/ItemCard.css';

const ItemCard = ({ item }) => {
    const user = useSelector(state => state.userState.user);
    return (
        <div>
            {!user ? (
                <Card className="cards" border="info">
                    <Card.Header>
                        <Row className="card-row" as="h2">
                            {item.title}
                            <Button variant="info">
                                {' '}
                                Star <Badge>{item.stars}</Badge>
                            </Button>
                        </Row>
                    </Card.Header>
                    <Card.Img variant="top" />
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
                            <Button variant="info">
                                {' '}
                                Star <Badge>{item.stars}</Badge>
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
