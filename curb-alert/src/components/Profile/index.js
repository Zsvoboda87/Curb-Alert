import React from 'react';
import { Button } from 'react-bootstrap';
import AddPost from '../AddPost'
import UpdateProfile from '../UpdateProfile'
import Login from '../Login';
import SignUp from '../Signup'
import Auth from '../../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_ME_BASIC } from '../../utils/queries';
import {Link} from 'react-router-dom';
function Profile() {

    const { data: userData } = useQuery(QUERY_ME_BASIC);

    const loggedIn = Auth.loggedIn();

    const { logout } = Auth;

    return (

        <div className="profile-header">

            <img className="profileImage" src="../images/avatar.png"></img>
            {loggedIn && userData ? (
                <div>
                    <h5>{userData.me.username}</h5>
                </div>
            ): null}
            <Link to={`/userprofile`}>
                <Button id="button">View Profile</Button>
            </Link>
            <Button id="button">Messages</Button>
            <AddPost />
            <UpdateProfile />
            <SignUp />
            <Login />
            <Button id="button" onClick={logout}>Logout</Button>
        </div>
    );
}

export default Profile;