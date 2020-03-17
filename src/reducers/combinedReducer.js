import { combineReducers } from 'redux';

import { userReducer as userState } from './userReducer';
import { itemReducer as itemState } from './itemReducer';

const reducer = combineReducers({
    userState,
    itemState
});

export default reducer;
