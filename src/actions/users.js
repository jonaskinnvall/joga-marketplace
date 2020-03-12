// import axios from 'axios';
import { SET_USER } from './actionTypes';
import axios from 'axios';

// TODO: Add action to edit user data (items etc.)
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
                    dispatch({ type: SET_USER, payload: { user, DB } });
                })
                .catch(error => {
                    axios
                        .post(URL, { userID: userID, name: user.name })
                        .then(res => {
                            DB = res.data;
                            dispatch({
                                type: SET_USER,
                                payload: { user, DB }
                            });
                        });
                });
    } else {
        return dispatch => dispatch({ type: SET_USER, payload: { user } });
    }
};
