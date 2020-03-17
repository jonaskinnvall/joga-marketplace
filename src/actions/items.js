import {
    ADD_ITEM,
    FETCH_ITEMS
    // EDIT_ITEM,
    // DELETE_ITEM,
    // FETCH_ITEM
} from '../actions/actionTypes';

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
    console.log(item);
    let newItem;

    return dispatch =>
        axios
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
                dispatch({
                    type: ADD_ITEM,
                    payload: { newItem }
                });
            });
};

export const editItem = item => {
    let itemURL = URI + '/items/' + item._id;
};

export const deleteItem = item => {
    let itemURL = URI + '/items/' + item._id;
};

export const fetchItem = item => {
    let itemURL = URI + '/items/' + item._id;
};
