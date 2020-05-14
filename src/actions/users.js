// import axios from 'axios';
import { SET_USER, EDIT_USER } from './actionTypes';
import axios from 'axios';

import { editManyItems, deleteManyItems } from './items';

const URI =
    location.href.indexOf('localhost') > 0
        ? 'http://localhost:3001/api/'
        : '/api/';

// Set user, first try to fetch user from DB
// if user doesn't exist, add new one to DB
// and dispatch SET_USER actions
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
                            image: {
                                imageURL: user.picture,
                            },
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

// Edit user, first change image in CLoudinary if included in user edit
// then upload update to DB and dispatch EDIT_USER action
export const editUser = (userUpdate, token) => {
    let idURL = URI + 'users/' + userUpdate.userID;
    let imageUp = URI + 'image-upload';
    let imageDel = URI + 'image-delete';
    let updatedUser;

    if (userUpdate.image.imageURL.includes('base64')) {
        return (dispatch) => {
            return axios
                .put(
                    imageDel,
                    { image: userUpdate.image.imageID },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                )
                .then(
                    axios
                        .post(
                            imageUp,
                            {
                                image: userUpdate.image.imageURL,
                                user: userUpdate.userID,
                                folder: 'users',
                            },
                            {
                                headers: { Authorization: `Bearer ${token}` },
                            }
                        )
                        .then((res) => {
                            userUpdate.image.imageURL = res.data.imageURL;
                            userUpdate.image.imageID = res.data.imageID;

                            return axios
                                .put(
                                    idURL,
                                    { userID: userUpdate.userID, userUpdate },
                                    {
                                        headers: {
                                            Authorization: `Bearer ${token}`,
                                        },
                                    }
                                )
                                .then((res) => {
                                    updatedUser = res.data;
                                    return dispatch({
                                        type: EDIT_USER,
                                        payload: { updatedUser },
                                    });
                                });
                        })
                );
        };
    } else {
        return (dispatch) =>
            axios
                .put(
                    idURL,
                    { userID: userUpdate.userID, userUpdate },
                    { headers: { Authorization: `Bearer ${token}` } }
                )
                .then((res) => {
                    updatedUser = res.data;
                    dispatch({ type: EDIT_USER, payload: { updatedUser } });
                });
    }
};

// Edit all users, e.g. when users items are deleted
// to remove items from user's "starredItems"
export const editAllUsers = (user, token, items = null) => {
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
            return axios
                .put(
                    URL,
                    { updateDB },
                    { headers: { Authorization: `Bearer ${token}` } }
                )
                .then(() => {
                    dispatch({ type: EDIT_USER, payload: { updatedUser } });
                });
        };
    } else if (Array.isArray(items) || items.length) {
        // If user is deleted, or removes all their items,
        // remove stars from other users for those items
        // that user has posted
        let updateDB = [...items];

        return (dispatch) => {
            return axios
                .put(
                    URL,
                    { updateDB },
                    { headers: { Authorization: `Bearer ${token}` } }
                )
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
                .put(
                    URL,
                    { updateDB },
                    { headers: { Authorization: `Bearer ${token}` } }
                )
                .then(() => {
                    dispatch(editUser(updatedUser, token));
                })
                .catch((error) => {
                    // Update user regardless of api call
                    // responds with 404 or not
                    dispatch(editUser(updatedUser, token));
                });
        };
    }
};

// Delete user, first delete profile picture from Cloudinary if exists
// then delete user from DB and dispatch editManyItems (to toggle stars)
// then delete items posted by user and lastly dispatch editAllUsers
export const deleteUserDB = (user, items, token) => {
    let idURL = URI + 'users/' + user.userID;
    let imageDel = URI + 'image-delete';
    let itemsToDelete = user.postedItems;
    let itemsToggleStar = user.starredItems;
    let updatedItems = items.filter(
        (item) => !itemsToDelete.includes(item._id)
    );

    if (user.image.imageID) {
        return (dispatch) => {
            axios
                .put(
                    imageDel,
                    { image: user.image.imageID },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                )
                .then(
                    axios
                        .delete(idURL, {
                            headers: { Authorization: `Bearer ${token}` },
                        })
                        .then(() => {
                            // If user has starred items, remove those stars
                            if (
                                Array.isArray(itemsToggleStar) &&
                                itemsToggleStar.length
                            ) {
                                dispatch(
                                    editManyItems(user, itemsToggleStar, token)
                                );
                            }
                        })
                        .then(() => {
                            // If user has posted items, delete those items too
                            // along with editing all users that has starred the items
                            if (
                                Array.isArray(itemsToDelete) &&
                                itemsToDelete.length
                            ) {
                                dispatch(
                                    deleteManyItems(
                                        itemsToDelete,
                                        updatedItems,
                                        token,
                                        user
                                    )
                                );

                                return dispatch(
                                    editAllUsers(user, token, itemsToDelete)
                                );
                            }
                        })
                );
        };
    } else {
        return (dispatch) => {
            return axios
                .delete(idURL, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then(() => {
                    // If user has starred items, remove those stars
                    if (
                        Array.isArray(itemsToggleStar) &&
                        itemsToggleStar.length
                    ) {
                        return dispatch(
                            editManyItems(user, itemsToggleStar, token)
                        );
                    }
                })
                .then(() => {
                    // If user has posted items, delete those items too
                    // along with editing all users that has starred the items
                    if (Array.isArray(itemsToDelete) && itemsToDelete.length) {
                        dispatch(
                            deleteManyItems(
                                itemsToDelete,
                                updatedItems,
                                token,
                                user
                            )
                        );
                        return dispatch(
                            editAllUsers(user, token, itemsToDelete)
                        );
                    }
                });
        };
    }
};
