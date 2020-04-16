import React from 'react';
import { useSelector } from 'react-redux';

// Import components
import ItemGrid from './ItemGrid';

const Home = () => {
    const itemState = useSelector((state) => state.itemState);

    return (
        <>
            {!Array.isArray(itemState) || !itemState.length ? (
                <div>Loading...</div>
            ) : (
                <>
                    <ItemGrid
                        itemsFromState={itemState.filter(
                            (item) => item.stars >= 1
                        )}
                        title={'Featured Items (1 star or more for now)'}
                        rowLength={4}
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
