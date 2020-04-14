import { SET_USER, EDIT_USER } from '../actions/actionTypes';
import produce from 'immer';

export const userReducer = produce((draft, action) => {
    switch (action.type) {
        case SET_USER:
            return action.payload.DB;
        case EDIT_USER:
            return action.payload.updatedUser;
    }
}, {});
