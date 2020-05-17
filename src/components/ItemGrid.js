import React, { useState } from 'react';
import { Container, Row, Button } from 'react-bootstrap';

import PropTypes from 'prop-types';

import ItemCard from './ItemCard';
import SVG from './icons/SVG';
import '../css/ItemGrid.css';

const ItemGrid = ({ items, title, rowLength, page }) => {
    const [pressed, setPressed] = useState(false);

    // Check if the page props is included and holds 'feat'
    // If it does, set text to string in case their are no starred items
    let text;
    if (page === 'feat') {
        text = 'There are currently no starred items';
    }

    // Checks if pressed is true and how many items there are in props
    // If more than 4 items and pressed is false, only show 4 otherwise
    // show all and expand if necessary
    return (
        <>
            {!Array.isArray(items) || !items.length ? (
                <Container fluid>
                    <div>
                        <h2>{title}</h2>
                    </div>
                    <Row className="empty-row">
                        {' '}
                        <h2>{text}</h2>{' '}
                    </Row>
                </Container>
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
    items: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    rowLength: PropTypes.number,
    page: PropTypes.string,
};
