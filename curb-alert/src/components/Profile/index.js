import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';

function Profile () {
    return (
        <div className="profile-header">
            <img className="profileImage" src="../images/avatar.png"></img>
            <Button id="profile-button">View Profile</Button>
            <Button id="profile-button">Messages</Button>
        </div>
    );
}

export default Profile;