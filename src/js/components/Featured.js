import React, { useState } from 'react';
import { useAuth0 } from '../Auth/Auth';

const Featured = () => {
    const { getTokenSilently} = useAuth0();

    const [showResult, setShowResult] = useState(false);
    const [apiReq, setApiReq] = useState({ post: '' });
    const [apiMessage, setApiMessage] = useState('');

    const callApi = async e => {
        e.preventDefault();
        try {
            const token = await getTokenSilently();

            const response = await fetch('/api/private', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ post: apiReq.post })
            });

            const responseData = await response.text();

            setShowResult(true);
            setApiMessage(responseData);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        // TODO: Set up grid of featured items
        <div>
            <h1>Featured</h1>
            <h3>External API</h3>
            <form onSubmit={callApi}>
                <input
                    type="text"
                    value={apiReq.post}
                    onChange={e => setApiReq({ post: e.target.value })}
                ></input>
                <button type="submit">Submit</button>
            </form>
            {showResult && <code>{JSON.stringify(apiMessage, null, 2)}</code>}
        </div>
    );
};

export default Featured;
