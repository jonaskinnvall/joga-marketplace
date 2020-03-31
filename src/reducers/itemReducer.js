import {
    ADD_ITEM,
    EDIT_ITEM,
    DELETE_ITEM,
    FETCH_ITEM,
    FETCH_ITEMS
} from '../actions/actionTypes';

const INITIAL_STATE = [];

export const itemReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_ITEM:
            return [...state, action.payload.newItem];

        case EDIT_ITEM:
            return [
                ...state,
                ...state.map(item => {
                    // If not item we want to change, keep as is
                    if (item._id !== action.payload.updatedItem._id) {
                        return item;
                    }
                    // Otherwise, change it
                    return {
                        ...item,
                        ...action.payload.updatedItem
                    };
                })
            ];

        case DELETE_ITEM:
            var itemID = action.payload._id;
            var newItems = state.filter(item => item._id != itemID);
            return [...state, newItems];

        case FETCH_ITEM:
            return [...state, action.payload.itemDB];

        case FETCH_ITEMS:
            return [...state, ...action.payload];

        default:
            return state;
    }
};
