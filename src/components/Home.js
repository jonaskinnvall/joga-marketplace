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
                    <ItemGrid itemsFromState={itemState} title={'Items'} rowLength={4} />

                    <ItemGrid
                            itemsFromState={itemState.filter(
                                (item) => item.category === 'Toys'
                            )}
                            title={'Toys'}
                            rowLength={4}
                    />
                </>
            )}
        </>
    );
};

export default Home;
