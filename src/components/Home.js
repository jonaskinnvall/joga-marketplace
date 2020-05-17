import React from 'react';
import { useSelector } from 'react-redux';
import { Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

// Import components
import ItemGrid from './ItemGrid';
import '../css/ItemCard.css';

const Home = ({ loading }) => {
    const itemState = useSelector((state) => state.itemState);

    // Function to get the most liked items
    const featuredItems = (itemsFromState) => {
        let items = itemsFromState
            .filter((item) => item.stars >= 1)
            .sort((a, b) => {
                return b.stars - a.stars;
            })
            .slice(0, 4);

        return items;
    };

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    {!Array.isArray(itemState) ||
                    (!itemState.length && !loading) ? (
                        <Row className="empty-row">
                            <h2>There are no items added to the site</h2>
                        </Row>
                    ) : (
                        <>
                            <ItemGrid
                                items={featuredItems([...itemState])}
                                title={'Featured Items'}
                                rowLength={4}
                                page={'feat'}
                            />

                            <ItemGrid
                                items={[...itemState]}
                                title={'All Items'}
                                rowLength={4}
                            />
                        </>
                    )}
                </>
            )}
        </>
    );
};

export default Home;

Home.propTypes = {
    loading: PropTypes.bool,
};
