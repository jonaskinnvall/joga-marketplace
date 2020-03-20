import {
    ADD_ITEM,
    FETCH_ITEMS,
    EDIT_ITEM,
    DELETE_ITEM,
    FETCH_ITEM
} from '../actions/actionTypes';

import { editUser } from './users';

import axios from 'axios';

const URI =
    location.href.indexOf('localhost') > 0
        ? 'http://localhost:3001/api/'
        : '/api/';

export const fetchItems = () => {
    let URL = URI + 'items/';
    let items;
    return dispatch =>
        axios.get(URL).then(res => {
            items = res.data.items;
            dispatch({ type: FETCH_ITEMS, payload: items });
        });
};

export const addItem = (user, item, token) => {
    let URL = URI + 'items/';
    let newItem;
    let newUser = { ...user };

    return dispatch => {
        return axios
            .post(
                URL,
                {
                    userID: user.userID,
                    user: user.name,
                    category: item.cat,
                    title: item.title,
                    desc: item.desc,
                    image: item.image
                },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            .then(res => {
                newItem = res.data.body;
                return dispatch({
                    type: ADD_ITEM,
                    payload: { newItem }
                });
            })
            .then(action => {
                newUser.postedItems.push(action.payload.newItem._id);
                newUser.nrItems++;
                dispatch(editUser(newUser));
            });
    };
};

export const editItem = itemUpdate => {
    let itemURL = URI + '/items/' + itemUpdate._id;
    let updatedItem;

    return dispatch =>
        axios.put(itemURL, { _id: itemUpdate._id, itemUpdate }).then(res => {
            updatedItem = res.data;
            dispatch({ type: EDIT_ITEM, payload: { updatedItem } });
        });
};

export const deleteItem = itemDelete => {
    let itemURL = URI + '/items/' + itemDelete._id;

    return dispatch =>
        axios.put(itemURL).then(res => {
            dispatch({ type: DELETE_ITEM, payload: { itemDelete } });
        });
};

export const fetchItem = item => {
    let itemURL = URI + '/items/' + item._id;
    let itemDB;
    return dispatch =>
        axios.get(itemURL).then(res => {
            itemDB = res.data;
            dispatch({ type: FETCH_ITEM, payload: { itemDB } });
        });
};

export const deleteAllItems = () => {
    let URL = URI + '/items/';
    return dispatch => {
        return axios.delete(URL).then(() => {
            dispatch(fetchItems());
        });
    };
};
