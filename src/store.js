import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers/combinedReducer';

let middlewares = [];
middlewares.push(thunk);

// Only use redux-logger in development mode
if (process.env.NODE_ENV === 'development') {
    const { logger } = require('redux-logger');
    middlewares.push(logger);
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = applyMiddleware(...middlewares);
const enhancers = composeEnhancers(middleware);
const store = createStore(reducer, enhancers);

export default store;
