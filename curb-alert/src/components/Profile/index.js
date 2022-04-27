import React from 'react';
import { Button } from 'react-bootstrap';
import AddPost from '../AddPost'
import Login from '../Login';
import SignUp from '../Signup'
import Auth from '../../utils/auth';

function Profile() {

    const { logout } = Auth;
    
    return (
        <div className="profile-header">
            <img className="profileImage" src="../images/avatar.png"></img>
            <Button id="profile-button">View Profile</Button>
            <Button id="profile-button">Messages</Button>
            <AddPost />
            <SignUp />
            <Login />
            <Button id="profile-button" onClick={ logout }>Logout</Button>
        </div>
    );
}

export default Profile;