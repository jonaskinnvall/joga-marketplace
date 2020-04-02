import {
    ADD_ITEM,
    EDIT_ITEM,
    DELETE_ITEM,
    FETCH_ITEM,
    FETCH_ITEMS,
    TOGGLE_STAR
} from '../actions/actionTypes';
import produce from 'immer';

export const itemReducer = produce((draft, action) => {
    switch (action.type) {
        case ADD_ITEM:
            draft.push(action.payload.newItem);
            return;

        case EDIT_ITEM:
            return [
                draft.map(item => {
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

        case TOGGLE_STAR:
            draft[action.payload.id] = action.payload.updatedItem;
            return;

        case DELETE_ITEM:
            var itemID = action.payload._id;
            draft.filter(item => item._id !== itemID);
            return;

        case FETCH_ITEM:
            return action.payload.itemDB;

        case FETCH_ITEMS:
            return action.payload;
    }
}, []);
