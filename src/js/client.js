import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';

// import Layout from './Layout';
import App from './App';
import store from './store';
// import Auth from './Auth/Auth.js';

// const auth = new Auth();

const app = document.getElementById('app');

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    app
);
