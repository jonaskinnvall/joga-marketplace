import {
    ADD_ITEM,
    EDIT_ITEM,
    DELETE_ITEM,
    FETCH_ITEM,
    FETCH_ITEMS,
} from '../actions/actionTypes';
import produce from 'immer';

export const itemReducer = produce((draft, action) => {
    switch (action.type) {
        case ADD_ITEM:
            draft.push(action.payload.newItem);
            return;

        case EDIT_ITEM:
            draft[action.payload.id] = action.payload.updatedItem;
            return;

        case DELETE_ITEM:
            var itemID = action.payload._id;
            draft.filter((item) => item._id !== itemID);
            return;

        case FETCH_ITEM:
            return action.payload.itemDB;

        case FETCH_ITEMS:
            return action.payload;
    }
}, []);
