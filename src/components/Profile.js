import React, { Fragment } from 'react';
import { useAuth0 } from '../Auth/Auth';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUser, editUser } from '../actions/users';

const Profile = () => {
    const { loading, user, logout } = useAuth0();
    const dispatch = useDispatch();
    const stateUser = useSelector(state => state.user);
    if (loading || !user) {
        return <div>Loading...</div>;
    }

    const updateUser = () => {
        let update = { ...stateUser };
        update.postedItems++;

        dispatch(editUser(update));
    };

    // JUST FOR NOW TO TEST AROUND: Function to delete user in DB
    const deleteUser = () => {
        let URL = 'http://localhost:3001/api/users/' + stateUser.userID;
        logout();
        axios.delete(URL).then(dispatch(setUser(user)));
    };

    return (
        <div>
            <div>
                <button onClick={updateUser}>Post Item</button>
                <button onClick={deleteUser}>Delete user</button>
            </div>
            <div>
                <h2>{stateUser.postedItems}</h2>
            </div>
            <Fragment>
                <img src={user.picture} alt="Profile" />
                <h2>{user.name}</h2>
                <p>{user.email}</p>
            </Fragment>
        </div>
    );
};

export default Profile;
