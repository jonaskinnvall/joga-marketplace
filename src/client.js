import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { Auth0Provider } from './Auth/Auth';

import 'bootstrap/dist/css/bootstrap.min.css';

import { AUTH_VAR } from '../../auth-var.json';

import App from './App';
import store from './store';
import history from './history';

const app = document.getElementById('app');

const onRedirectCallback = appState => {
    history.push(
        appState && appState.targetUrl
            ? appState.targetUrl
            : window.location.pathname
    );
};

ReactDOM.render(
    <Provider store={store}>
        <Auth0Provider
            domain={AUTH_VAR.domain}
            client_id={AUTH_VAR.clientID}
            redirect_uri={AUTH_VAR.redirectUri}
            audience={AUTH_VAR.APIaudience}
            onRedirectCallback={onRedirectCallback}
        >
            <App />
        </Auth0Provider>
    </Provider>,
    app
);
