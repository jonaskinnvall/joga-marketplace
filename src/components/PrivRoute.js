import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useAuth0 } from '../Auth/Auth';
import { PropTypes } from 'prop-types';

// Route to hide profile page so it cannot be accessed by users not signed in
// (From the Auth0 SPA set up tutorial)
const PrivateRoute = ({ component: Component, path, ...rest }) => {
    const { loading, isAuthenticated, loginWithRedirect } = useAuth0();

    useEffect(() => {
        if (loading || isAuthenticated) {
            return;
        }
        const fn = async () => {
            await loginWithRedirect({
                appState: { targetUrl: path },
            });
        };
        fn();
    }, [loading, isAuthenticated, loginWithRedirect, path]);

    const render = (props) =>
        isAuthenticated === true ? <Component {...props} /> : null;

    return <Route path={path} render={render} {...rest} />;
};

PrivateRoute.propTypes = {
    component: PropTypes.any,
    path: PropTypes.string,
};

export default PrivateRoute;
