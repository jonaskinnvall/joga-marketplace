import {
    ADD_ITEM,
    FETCH_ITEMS,
    EDIT_ITEM,
    DELETE_ITEM,
    DELETE_ITEMS,
} from '../actions/actionTypes';

import { editUser, editAllUsers } from './users';

import axios from 'axios';

const URI =
    location.href.indexOf('localhost') > 0
        ? 'http://localhost:3001/api/'
        : '/api/';

export const fetchItems = () => {
    let URL = URI + 'items/';
    let items;
    return (dispatch) =>
        axios.get(URL).then((res) => {
            items = res.data.items;
            dispatch({ type: FETCH_ITEMS, payload: items });
        });
};

export const addItem = (user, item, token) => {
    let URL = URI + 'items/';
    let newItem;

    return (dispatch) => {
        return axios
            .post(
                URL,
                {
                    userID: user.userID,
                    user: user.name,
                    category: item.cat,
                    title: item.title,
                    desc: item.desc,
                    price: item.price,
                    image: item.image,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            .then((res) => {
                newItem = res.data.body;
                return dispatch({
                    type: ADD_ITEM,
                    payload: { newItem },
                });
            })
            .then((action) => {
                user.postedItems = [
                    ...user.postedItems,
                    action.payload.newItem._id,
                ];
                user.nrItems++;
                dispatch(editUser(user, token));
            });
    };
};

export const editItem = (item, token, id) => {
    let itemURL = URI + 'items/' + item._id;
    let updatedItem;

    return (dispatch) => {
        return axios
            .put(
                itemURL,
                { _id: item._id, item },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            .then((res) => {
                updatedItem = res.data;
                return dispatch({
                    type: EDIT_ITEM,
                    payload: { updatedItem, id },
                });
            });
    };
};

export const editManyItems = (user, items, token) => {
    let URL = URI + 'items/';
    return (dispatch) => {
        return axios
            .put(
                URL,
                { user: user },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            .then(() => {
                dispatch(fetchItems());
            });
    };
};

export const toggleStar = (user, item, token, starred, id) => {
    let itemURL = URI + 'items/' + item._id;
    let updatedItem;

    if (!starred) {
        item.starredBy = [...item.starredBy, user.userID];
        item.stars++;

        return (dispatch) => {
            return axios
                .put(
                    itemURL,
                    { _id: item._id, item },
                    { headers: { Authorization: `Bearer ${token}` } }
                )
                .then((res) => {
                    updatedItem = res.data;
                    return dispatch({
                        type: EDIT_ITEM,
                        payload: { updatedItem, id },
                    });
                })
                .then((action) => {
                    user.starredItems = [
                        ...user.starredItems,
                        action.payload.updatedItem._id,
                    ];
                    dispatch(editUser(user, token));
                });
        };
    } else {
        let userID = user.userID;
        item.starredBy = item.starredBy.filter((user) => user !== userID);
        item.stars--;

        return (dispatch) => {
            return axios
                .put(
                    itemURL,
                    { _id: item._id, item },
                    { headers: { Authorization: `Bearer ${token}` } }
                )
                .then((res) => {
                    updatedItem = res.data;
                    return dispatch({
                        type: EDIT_ITEM,
                        payload: { updatedItem, id },
                    });
                })
                .then((action) => {
                    let itemID = action.payload.updatedItem._id;
                    user.starredItems = user.starredItems.filter(
                        (item) => item !== itemID
                    );
                    dispatch(editUser(user, token));
                });
        };
    }
};

export const deleteItem = (user, deleteItem, token, id) => {
    let itemURL = URI + 'items/' + deleteItem._id;

    return (dispatch) => {
        return axios
            .delete(itemURL, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                return dispatch({
                    type: DELETE_ITEM,
                    payload: { id },
                });
            })
            .then(() => {
                dispatch(editAllUsers(user, token, deleteItem));
            });
    };
};

export const deleteManyItems = (toDelete, updated, token) => {
    let URL = URI + 'items/';
    return (dispatch) => {
        return axios
            .delete(
                URL,
                { data: toDelete },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            .then(() => {
                dispatch({
                    type: DELETE_ITEMS,
                    payload: { items: updated, all: false },
                });
            });
    };
};

export const deleteAllItems = (user, token) => {
    let URL = URI + 'items/';
    return (dispatch) => {
        return axios
            .delete(URL, { headers: { Authorization: `Bearer ${token}` } })
            .then(() => {
                return dispatch({
                    type: DELETE_ITEMS,
                    payload: { items: [], all: true },
                });
            })
            .then(() => {
                dispatch(editAllUsers(user, token));
            });
    };
};
