import React, { useState, useEffect } from 'react';
import { useAuth0 } from '../Auth/Auth';

const Home = () => {
    const { isAuthenticated, getTokenSilently } = useAuth0();

    const [showResult, setShowResult] = useState(false);
    const [apiMessage, setApiMessage] = useState('');

    useEffect(() => {
        callAPI(setShowResult, isAuthenticated, getTokenSilently)
            .then(res => setApiMessage(res.express))
            .catch(err => console.log(err));
    });

    return (
        <div>
            <h1>Home Page</h1>
            <p>{showResult && apiMessage}</p>
        </div>
    );
};

const callAPI = async (setShowResult, isAuthenticated, getTokenSilently) => {
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

export default Home;
