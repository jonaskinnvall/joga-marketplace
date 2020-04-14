// import axios from 'axios';
import { SET_USER, EDIT_USER } from './actionTypes';
import axios from 'axios';

import { deleteManyItems } from './items';

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
        let updatedDB = { ...user };
        let userUpdate = {
            nrItems: 0,
            postedItems: [],
            starredItems: [],
        };

        updatedDB.nrItems = 0;
        updatedDB.postedItems = [];
        updatedDB.starredItems = [];

        return (dispatch) => {
            return axios.put(URL, { userUpdate }).then(() => {
                dispatch({ type: EDIT_USER, payload: { updatedDB } });
            });
        };
    } else {
        // If user is deleted, remove stars from other
        // users for those items that user has posted
        let updatedDB = {};
        let userUpdate = [...items];

        return (dispatch) => {
            return axios.put(URL, { userUpdate }).then(() => {
                dispatch({ type: SET_USER, payload: { updatedDB } });
            });
        };
    }
};

export const deleteUserDB = (user) => {
    let idURL = URI + 'users/' + user.userID;
    let itemsToDelete = user.postedItems;

    return (dispatch) => {
        return axios.delete(idURL).then(() => {
            // If user has posted items, delete those items too
            if (Array.isArray(itemsToDelete) && itemsToDelete.length) {
                return dispatch(deleteManyItems(itemsToDelete)).then(() => {
                    dispatch(editAllUsers(user, itemsToDelete));
                });
            }
        });
    };
};
