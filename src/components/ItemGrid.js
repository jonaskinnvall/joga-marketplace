import React from 'react';
import { Container, Row } from 'react-bootstrap';

import ItemCard from './ItemCard';
import '../css/ItemGrid.css';

const ItemGrid = items => {
    return (
        <div>
            {!Array.isArray(items.items) || !items.items.length ? (
                <div> Loading... </div>
            ) : (
                <Container fluid>
                    <Row className="grid-row">
                        {items.items.map(item => (
                            <ItemCard key={item._id} {...item} />
                        ))}
                    </Row>
                </Container>
            )}
        </div>
    );
};
export default ItemGrid;
