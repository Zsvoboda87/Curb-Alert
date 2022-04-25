import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Feed from '../Feed/index.js';
import Profile from '../Profile/index.js';
import PostSingle from './PostSingle.js';



function Home() {
    return (
        <Row className="main-row">
            <Col className="profile-section">
                <div className="header">
                    <img className='logo' src="../images/logo.png" />
                    <h1>Curb Alert</h1>
                </div>
                <Profile />
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