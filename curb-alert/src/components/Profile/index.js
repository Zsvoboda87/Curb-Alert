import React from 'react';
import { Button } from 'react-bootstrap';
import AddPost from '../AddPost'
import UpdateProfile from '../UpdateProfile'
import Login from '../Login';
import SignUp from '../Signup'
import Auth from '../../utils/auth';
import AddPostPromptLogin from '../AddPost/addPostPromptLogin';
import { useQuery } from '@apollo/client';
import { QUERY_ME_BASIC } from '../../utils/queries';
import { Link, Redirect, useHistory } from 'react-router-dom';

function Profile() {

    const { data: userData } = useQuery(QUERY_ME_BASIC);
    const loggedIn = Auth.loggedIn();

    const { logout } = Auth;

    const history = useHistory();

    const routeChange = () => {
        let path = `/userprofile`;
        history.push(path);
    }

    return (
        <div className="profile-header">
            
            {loggedIn && userData ? (
                <>
                <img className="user-profile-image" src={userData.me.userImage} alt="user-avatar"></img>
                <div className="username">
                    <h5>{userData.me.username}</h5>
                </div>
                </>
            ) : <img className="profileImage" src="../images/avatar.png" alt="user-avatar"></img>}


            {loggedIn ? (
                <>
                    <AddPost />
                    <div class="large-button">
                    <Button id="button">Messages</Button>
                    <Button id="button" onClick={routeChange}>
                        View Profile
                    </Button>
                    <Button id="button" onClick={logout}>Logout</Button>
                    </div>
                </>
            ) : (
                <>
                    <AddPostPromptLogin />
                    <SignUp />
                    <Login />
                </>

            )}


        </div>
    );
}

export default Profile;