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
        : 'https://joga-market.herokuapp.com/';

// Fetch all items from DB and dispatch FETCH_ITEMS action to reducer
export const fetchItems = () => {
    let URL = URI + 'items/';
    let items;
    return (dispatch) =>
        axios.get(URL).then((res) => {
            items = res.data.items;
            dispatch({ type: FETCH_ITEMS, payload: items });
        });
};

// Add item, check if image is included, if so upload
// to CLoudinary and save response URL to items imageURL
// If not, go directly to add to DB followed by dispatch
// ADD_ITEM action and then dispatch editUser
export const addItem = (user, item, token) => {
    let URL = URI + 'items/';
    let imageURL = URI + 'image-upload';
    let newItem;

    if (item.image.imageURL) {
        return (dispatch) => {
            return axios
                .post(
                    imageURL,
                    {
                        image: item.image.imageURL,
                        user: user.userID,
                        folder: 'items',
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                )
                .then((res) => {
                    item.image.imageURL = res.data.imageURL;
                    item.image.imageID = res.data.imageID;

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
                                image: {
                                    imageURL: item.image.imageURL,
                                    imageID: item.image.imageID,
                                },
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
                });
        };
    } else {
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
    }
};

// Edit item, check if image is included, if so,
// remove previous image from Cloudinary and
// upload new image then dispatch EDIT_ITEM action
export const editItem = (item, token, id, user) => {
    let itemURL = URI + 'items/' + item._id;
    let imageUp = URI + 'image-upload';
    let imageDel = URI + 'image-delete';
    let updatedItem;

    if (item.image.imageURL) {
        return (dispatch) => {
            return axios
                .put(
                    imageDel,
                    { image: item.image.imageID },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                )
                .then(
                    axios
                        .post(
                            imageUp,
                            {
                                image: item.image.imageURL,
                                user: user.userID,
                                folder: 'items',
                            },
                            {
                                headers: { Authorization: `Bearer ${token}` },
                            }
                        )
                        .then((res) => {
                            item.image.imageURL = res.data.imageURL;
                            item.image.imageID = res.data.imageID;

                            return axios
                                .put(
                                    itemURL,
                                    { _id: item._id, item },
                                    {
                                        headers: {
                                            Authorization: `Bearer ${token}`,
                                        },
                                    }
                                )
                                .then((res) => {
                                    updatedItem = res.data;
                                    return dispatch({
                                        type: EDIT_ITEM,
                                        payload: { updatedItem, id },
                                    });
                                });
                        })
                );
        };
    } else {
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
    }
};

// Edit multiple items, e.g. when user is deleted
// Update all relevant items in DB then dispatch fetchItems
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

// Toogle star of item, check if item is already starred,
// if so, remove star, otherwise add star then dispatch
// EDIT_ITEM action followed by editUser
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

// Delete item, remove image from Cloudinary
// then remove item from DB followed by
// dispatching DELETE_ITEM action and dispatch editAllUsers
export const deleteItem = (user, deleteItem, token, id) => {
    let itemURL = URI + 'items/' + deleteItem._id;
    let imageURL = URI + 'image-delete';

    return (dispatch) => {
        return axios
            .put(
                imageURL,
                { image: deleteItem.image.imageID },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            .then(
                axios
                    .delete(itemURL, {
                        headers: { Authorization: `Bearer ${token}` },
                    })
                    .then((res) => {
                        return dispatch({
                            type: DELETE_ITEM,
                            payload: { id },
                        });
                    })
                    .then(() => {
                        dispatch(editAllUsers(user, token, deleteItem));
                    })
            );
    };
};

// Delete multiple items, delete relevant images from Cloudinary
// then delete items from DB followed by dispatching DELETE_ITEMS action
export const deleteManyItems = (toDelete, updated, token, user = null) => {
    let URL = URI + 'items/';
    let imageURL = URI + 'image-delete';

    return (dispatch) => {
        axios
            .put(
                imageURL,
                { user: user.userID },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            .then(
                axios.delete(URL, { data: toDelete }).then(() => {
                    return dispatch({
                        type: DELETE_ITEMS,
                        payload: { items: updated, all: false },
                    });
                })
            );
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
