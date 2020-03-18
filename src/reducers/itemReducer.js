import {
    ADD_ITEM,
    EDIT_ITEM,
    DELETE_ITEM,
    FETCH_ITEM,
    FETCH_ITEMS
} from '../actions/actionTypes';

const INITIAL_STATE = { items: [] };

export const itemReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_ITEM:
            return {
                ...state,
                items: [...state.items, action.payload.newItem]
            };

        case EDIT_ITEM:
            return {
                ...state,
                items: [...state.items, action.payload.updatedItem]
            };

        case DELETE_ITEM:
            var itemID = action.payload._id;
            var newItems = state.items.filter(item => item._id != itemID);
            return { ...state, items: [newItems] };

        case FETCH_ITEM:
            return { ...state, items: [...state.items, action.payload.itemDB] };

        case FETCH_ITEMS:
            var items = action.payload;
            return { ...state, items: items };

        default:
            return state;
    }
};
