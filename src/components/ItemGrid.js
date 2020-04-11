import React, { useState } from 'react';
import { Container, Row, Button } from 'react-bootstrap';

import PropTypes from 'prop-types';

import ItemCard from './ItemCard';
import SVG from './icons/SVG';
import '../css/ItemGrid.css';

const ItemGrid = ({ itemsFromState, title }) => {
    let items = [...itemsFromState];

    const [pressed, setPressed] = useState(false);
    return (
        <>
            {!Array.isArray(items) || !items.length ? (
                <div> Loading... </div>
            ) : (
                <Container fluid>
                    {!pressed ? (
                        <div>
                            <h2>{title}</h2>
                        </div>
                    ) : (
                        <div>
                            <Row className="header-row">
                                <h2>{title}</h2>
                                {'        '}
                                <Button
                                    variant="info"
                                    onClick={() => setPressed(false)}
                                >
                                    {' '}
                                    Hide{' '}
                                </Button>
                            </Row>
                        </div>
                    )}

                    {items.length > 3 && pressed == false ? (
                        <Row className="grid-row">
                            {items.slice(0, 3).map((item) => (
                                <ItemCard key={item._id} item={item} />
                            ))}
                            <div>
                                <Button
                                    onClick={() => setPressed(true)}
                                    variant="light"
                                    className="grid-btn"
                                >
                                    <SVG name="chevron" width="32" />
                                </Button>
                            </div>
                        </Row>
                    ) : (
                        <Row className="grid-row">
                            {items.map((item) => (
                                <ItemCard key={item._id} item={item} />
                            ))}
                        </Row>
                    )}
                </Container>
            )}
        </>
    );
};
export default ItemGrid;

ItemGrid.propTypes = {
    itemsFromState: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    pressed: PropTypes.bool,
    pressBtn: PropTypes.func,
};
