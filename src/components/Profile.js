import React, { Fragment } from 'react';
import { useAuth0 } from '../Auth/Auth';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUser, editUser } from '../actions/users';

const Profile = () => {
    const { loading, logout } = useAuth0();
    const dispatch = useDispatch();
    const userState = useSelector(state => state.userState.user);
    if (loading || !userState) {
        return <div>Loading...</div>;
    }

    const updateUser = () => {
        let update = { ...userState };
        update.nrItems++;

        dispatch(editUser(update));
    };

    // JUST FOR NOW TO TEST AROUND: Function to delete user in DB
    const deleteUser = () => {
        let URL = 'http://localhost:3001/api/users/' + userState.userID;
        logout();
        axios.delete(URL).then(dispatch(setUser()));
    };

    return (
        <div>
            <div>
                <button onClick={updateUser}>Post Item</button>
                <button onClick={deleteUser}>Delete user</button>
            </div>
            <div>
                <h2>{userState.nrItems}</h2>
            </div>
            <Fragment>
                <img src={userState.image} alt="Profile" />
                <h2>{userState.name}</h2>
            </Fragment>
        </div>
    );
};

export default Profile;
