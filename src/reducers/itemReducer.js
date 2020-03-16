import {
    ADD_ITEM,
    EDIT_ITEM,
    DELETE_ITEM,
    FETCH_ITEM
} from '../actions/actionTypes';

const INITIAL_STATE = {
    items: []
};

export const itemReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_ITEM:
            return { ...state, items: action.payload.DB };
        case EDIT_ITEM:
            return { ...state, items: action.payload.DB };
        case DELETE_ITEM:
            return { ...state, items: action.payload.DB };
        case FETCH_ITEM:
            return { ...state, items: action.payload.DB };
        default:
            return state;
    }
};

// export default itemReducer;
