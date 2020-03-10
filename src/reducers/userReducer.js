import { SET_USER } from '../actions/actionTypes';

const INITIAL_STATE = {
    user: {}
};

// Add case for editing user data (itmes etc.)
function userReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_USER:
            var user = action.payload;
            return {
                ...state,
                user: user
            };

        default:
            return state;
    }
}

export default userReducer;
