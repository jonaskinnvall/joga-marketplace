// import axios from 'axios';
import { SET_USER, EDIT_USER } from './actionTypes';
import axios from 'axios';

import { editManyItems, deleteManyItems } from './items';

const URI =
    location.href.indexOf('localhost') > 0
        ? 'http://localhost:3001/api/'
        : '/api/';

export const setUser = (user) => {
    if (user) {
        let userID = user.sub;
        userID = userID.split('|')[1];
        let URL = URI + 'users/';
        let idURL = URL + userID;
        let DB;

        return (dispatch) =>
            axios
                .get(idURL)
                .then((res) => {
                    DB = res.data;
                    dispatch({ type: SET_USER, payload: { DB } });
                })
                .catch((error) => {
                    axios
                        .post(URL, {
                            userID: userID,
                            name: user.name,
                            image: user.picture,
                        })
                        .then((res) => {
                            DB = res.data.body;
                            dispatch({
                                type: SET_USER,
                                payload: { DB },
                            });
                        });
                });
    } else {
        return (dispatch) => dispatch({ type: SET_USER, payload: { user } });
    }
};

export const editUser = (userUpdate) => {
    let idURL = URI + 'users/' + userUpdate.userID;
    let updatedUser;

    return (dispatch) =>
        axios
            .put(idURL, { userID: userUpdate.userID, userUpdate })
            .then((res) => {
                updatedUser = res.data;
                dispatch({ type: EDIT_USER, payload: { updatedUser } });
            });
};

export const editAllUsers = (user, items = null) => {
    let URL = URI + 'users/';

    //If all items are deleted, delete items from all users
    if (!items) {
        let updatedUser = { ...user };
        let updateDB = {
            nrItems: 0,
            postedItems: [],
            starredItems: [],
        };

        updatedUser.nrItems = 0;
        updatedUser.postedItems = [];
        updatedUser.starredItems = [];

        return (dispatch) => {
            return axios.put(URL, { updateDB }).then(() => {
                dispatch({ type: EDIT_USER, payload: { updatedUser } });
            });
        };
    } else if (Array.isArray(items) || items.length) {
        // If user is deleted, remove stars from other
        // users for those items that user has posted
        let updateDB = [...items];

        return (dispatch) => {
            return axios
                .put(URL, { updateDB })
                .then(() => {
                    return;
                })
                .catch((error) => {
                    // Return regardless of api call
                    // responds with 404 or not
                    return;
                });
        };
    } else {
        // If single item is deleted, remove item from
        // current user and other users starredItems
        let updatedUser = { ...user };
        updatedUser.nrItems--;
        updatedUser.postedItems = updatedUser.postedItems.filter((id) => {
            return id !== items._id;
        });
        let updateDB = [items];

        return (dispatch) => {
            return axios
                .put(URL, { updateDB })
                .then(() => {
                    dispatch(editUser(updatedUser));
                })
                .catch((error) => {
                    // Update user regardless of api call
                    // responds with 404 or not
                    dispatch(editUser(updatedUser));
                });
        };
    }
};

export const deleteUserDB = (user) => {
    let idURL = URI + 'users/' + user.userID;
    let itemsToDelete = user.postedItems;
    let itemsToggleStar = user.starredItems;

    return (dispatch) => {
        return axios
            .delete(idURL)
            .then(() => {
                // If user has starred items, remove those stars
                if (Array.isArray(itemsToggleStar) && itemsToggleStar.length) {
                    return dispatch(editManyItems(user, itemsToggleStar));
                }
            })
            .then(() => {
                // If user has posted items, delete those items too
                // along with editing all users that has starred the items
                if (Array.isArray(itemsToDelete) && itemsToDelete.length) {
                    return dispatch(deleteManyItems(itemsToDelete)).then(() => {
                        return dispatch(editAllUsers(user, itemsToDelete));
                    });
                }
            });
    };
};
