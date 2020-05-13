import React from 'react';
import { useSelector } from 'react-redux';
import { Row } from 'react-bootstrap';

// Import components
import ItemGrid from './ItemGrid';
import '../css/ItemCard.css';

const Home = () => {
    const itemState = useSelector((state) => state.itemState);

    return (
        <>
            {!Array.isArray(itemState) || !itemState.length ? (
                <Row className="empty-row">
                    <h2>There are no items added to the site</h2>
                </Row>
            ) : (
                <>
                    <ItemGrid
                        itemsFromState={itemState.filter(
                            (item) => item.stars >= 1
                        )}
                        title={'Featured Items (1 star or more for now)'}
                        rowLength={4}
                        page={'feat'}
                    />

                    <ItemGrid
                        itemsFromState={itemState}
                        title={'All Items'}
                        rowLength={4}
                    />
                </>
            )}
        </>
    );
};

export default Home;
