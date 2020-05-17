import {
    ADD_ITEM,
    EDIT_ITEM,
    FETCH_ITEMS,
    DELETE_ITEM,
    DELETE_ITEMS,
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

        case FETCH_ITEMS:
            return action.payload;

        case DELETE_ITEM:
            draft.splice(action.payload.id, 1);
            return;

        case DELETE_ITEMS:
            return action.payload.items;
    }
}, []);
