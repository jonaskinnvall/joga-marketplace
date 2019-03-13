import axios from "axios";

// //Get current user(me) from token in localStorage
// export const ME_FROM_TOKEN = 'ME_FROM_TOKEN';
// export const ME_FROM_TOKEN_SUCCESS = 'ME_FROM_TOKEN_SUCCESS';
// export const ME_FROM_TOKEN_FAILURE = 'ME_FROM_TOKEN_FAILURE';
// export const RESET_TOKEN = 'RESET_TOKEN';

//Sign Up User
export const SIGNUP_USER = "SIGNUP_USER";
export const SIGNUP_USER_SUCCESS = "SIGNUP_USER_SUCCESS";
export const SIGNUP_USER_FAILURE = "SIGNUP_USER_FAILURE";
export const RESET_USER = "RESET_USER";

//Sign In User
export const SIGNIN_USER = "SIGNIN_USER";
export const SIGNIN_USER_SUCCESS = "SIGNIN_USER_SUCCESS";
export const SIGNIN_USER_FAILURE = "SIGNIN_USER_FAILURE";

//log out user
export const LOGOUT_USER = "LOGOUT_USER";

const ROOT_URL =
    location.href.indexOf("localhost") > 0
        ? "http://localhost:8080/api"
        : "/api";

export function signUpUser(formValues) {
    const request = axios.post(`${ROOT_URL}/users/signup`, formValues);
    return {
        type: SIGNUP_USER,
        payload: request
    };
}

export function signUpUserSuccess(user) {
    return {
        type: SIGNUP_USER_SUCCESS,
        payload: user
    };
}

export function signUpUserFailure(error) {
    return {
        type: SIGNUP_USER_FAILURE,
        payload: error
    };
}

export function signInUser(formValues) {
    const request = axios.post(`${ROOT_URL}/users/signin`, formValues);
    return {
        type: SIGNIN_USER,
        payload: request
    };
}

export function signInUserSuccess(user) {
    return {
        type: SIGNIN_USER_SUCCESS,
        payload: user
    };
}

export function signInUserFailure(error) {
    return {
        type: SIGNIN_USER_FAILURE,
        payload: error
    };
}

export function logoutUser() {
    return {
        type: LOGOUT_USER
    };
}
