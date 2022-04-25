import React from 'react';
import { Row, Button, Col } from 'react-bootstrap';
import Feed from '../Feed/index.js';
import Profile from '../Profile/index.js';


function Home() {
    return (
        <Row className="main-row">
            <Col className="profile-section">
                <div className="header">
                    <img className='logo' src="../images/logo.png" />
                    <h1>Curb Alert</h1>
                </div>
                <Profile />
                <div>
                    <Button>Login</Button>
                    <Button>Sign Up</Button>
                </div>
            </Col>

            <Col xs={6} className="feed">
                <Feed />
            </Col>

            <Col>
                <h1>weather</h1>
            </Col>
        </Row>
    );
}

export default Home;