// import axios from 'axios';
import { SET_USER } from './actionTypes';

// TODO: Make setUser post user to DB
// TODO: Add action to edit user data (items etc.)

// const URI =
//     location.href.indexOf('localhost') > 0
//         ? 'http://localhost:8080/api/'
//         : '/api/';

export function setUser(user) {
    if (user != {}) {
        return { type: SET_USER, payload: user.user };
    } else {
        return { type: SET_USER, payload: user };
    }
}
