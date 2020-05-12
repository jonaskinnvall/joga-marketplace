import React, { useState } from 'react';
import { Container, Row, Button } from 'react-bootstrap';

import PropTypes from 'prop-types';

import ItemCard from './ItemCard';
import SVG from './icons/SVG';
import '../css/ItemGrid.css';

const ItemGrid = ({ itemsFromState, title, rowLength }) => {
    let items = [...itemsFromState];

    const [pressed, setPressed] = useState(false);
    return (
        <>
            {!Array.isArray(items) || !items.length ? (
                <div> Loading... </div>
            ) : (
                <Container fluid>
                    <div>
                        <h2>{title}</h2>
                    </div>

                    {items.length > rowLength && pressed == false ? (
                        <>
                            <Row className="grid-row">
                                {items.slice(0, rowLength).map((item) => (
                                    <ItemCard key={item._id} item={item} />
                                ))}
                            </Row>
                            <Row>
                                <Button
                                    onClick={() => setPressed(true)}
                                    variant="light"
                                    className="grid-btn-row"
                                >
                                    <SVG name="chevron-down" width="32" />
                                </Button>
                            </Row>
                        </>
                    ) : (
                        <>
                            <Row className="grid-row">
                                {items.map((item) => (
                                    <ItemCard key={item._id} item={item} />
                                ))}
                            </Row>
                            {pressed == true && (
                                <Row>
                                    <Button
                                        onClick={() => setPressed(false)}
                                        variant="light"
                                        className="grid-btn-row"
                                    >
                                        <SVG name="chevron-up" width="32" />
                                    </Button>
                                </Row>
                            )}
                        </>
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
    rowLength: PropTypes.number,
};
