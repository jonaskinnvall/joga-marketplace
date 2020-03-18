import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchItems } from '../actions/items';

const Home = () => {
    const dispatch = useDispatch();
    const itemState = useSelector(state => state.itemState);

    const getItems = async e => {
        e.preventDefault();
        await dispatch(fetchItems());
    };

    return (
        // TODO: Set up grid for items, maybe category dependent
        <div>
            <h1>Home Page</h1>
            <button onClick={getItems}>Fetch items from DB</button>
            {itemState.items[0] ? <p>{itemState.items[0].title}</p> : <p></p>}
        </div>
    );
};

export default Home;
