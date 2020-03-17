import { SET_USER, EDIT_USER } from '../actions/actionTypes';

const INITIAL_STATE = {
    user: {}
};

export const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.payload.DB };
        case EDIT_USER:
            return { ...state, user: action.payload.updatedDB };
        default:
            return state;
    }
};
