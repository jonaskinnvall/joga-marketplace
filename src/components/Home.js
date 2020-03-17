import React, { useState } from 'react';
import { useAuth0 } from '../Auth/Auth';
import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';

import { fetchItems } from '../actions/items';

const Home = () => {
    const { isAuthenticated, getTokenSilently } = useAuth0();

    const dispatch = useDispatch();
    const itemState = useSelector(state => state.itemState);

    const [showResult, setShowResult] = useState(false);
    const [apiMessage, setApiMessage] = useState('');

    const callAPI = async (
        setShowResult,
        isAuthenticated,
        getTokenSilently
    ) => {
        let response;

        if (isAuthenticated) {
            const token = await getTokenSilently();

            response = await fetch('/api/private', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setShowResult(true);
        } else {
            response = await fetch('/api/hello');
            setShowResult(true);
        }
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);

        return body;
    };

    function handleClick(e) {
        e.preventDefault();
        callAPI(setShowResult, isAuthenticated, getTokenSilently)
            .then(res => setApiMessage(res.express))
            .catch(err => console.log(err));
    }

    const getItems = async e => {
        e.preventDefault();
        // let URL = 'http://localhost:3001/api/items';
        await dispatch(fetchItems());
    };

    return (
        // TODO: Set up grid for items, maybe category dependent
        <div>
            <h1>Home Page</h1>
            <button onClick={handleClick}>Call API</button>
            <button onClick={getItems}>Fetch items from DB</button>
            {itemState.items[0] ? <p>{itemState.items[0].title}</p> : <p></p>}
            <p>{showResult && apiMessage}</p>
        </div>
    );
};

export default Home;
