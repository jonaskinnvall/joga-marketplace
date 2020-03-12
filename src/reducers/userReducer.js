import { SET_USER } from '../actions/actionTypes';

const INITIAL_STATE = {
    user: ''
};

// TODO: Add case for editing user data (itmes etc.)
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_USER:
            var user = action.payload.user;
            return {
                ...state,
                user: user
            };

        default:
            return state;
    }
};

export default userReducer;
