// import axios from 'axios';
import { SET_USER, EDIT_USER } from './actionTypes';
import axios from 'axios';

const URI =
    location.href.indexOf('localhost') > 0
        ? 'http://localhost:3001/api/'
        : '/api/';

export const setUser = user => {
    if (user) {
        let userID = user.sub;
        userID = userID.split('|')[1];
        let URL = URI + 'users/';
        let idURL = URL + userID;
        let DB;

        return dispatch =>
            axios
                .get(idURL)
                .then(res => {
                    DB = res.data;
                    dispatch({ type: SET_USER, payload: { DB } });
                })
                .catch(error => {
                    axios
                        .post(URL, {
                            userID: userID,
                            name: user.name,
                            image: user.picture
                        })
                        .then(res => {
                            DB = res.data.body;
                            console.log(res.data.message);
                            dispatch({
                                type: SET_USER,
                                payload: { DB }
                            });
                        });
                });
    } else {
        return dispatch => dispatch({ type: SET_USER, payload: { user } });
    }
};

export const editUser = userUpdate => {
    let idURL = URI + 'users/' + userUpdate.userID;
    let updatedDB;

    return dispatch =>
        axios
            .put(idURL, { userID: userUpdate.userID, userUpdate })
            .then(res => {
                updatedDB = res.data;
                console.log(updatedDB);

                dispatch({ type: EDIT_USER, payload: { updatedDB } });
            });
};
