import { combineReducers } from 'redux';

import { userReducer as userState } from './userReducer';
import { itemReducer as itemsState } from './itemReducer';

const reducer = combineReducers({
    userState,
    itemsState
});

export default reducer;
