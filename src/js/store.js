import { createStore, applyMiddleware, compose } from 'redux';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from './reducers/userReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = applyMiddleware(logger, thunk);
const enhancers = composeEnhancers(middleware);
const store = createStore(reducer, enhancers);

export default store;
