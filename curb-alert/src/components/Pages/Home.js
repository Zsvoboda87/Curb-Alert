import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Feed from '../Feed/index.js';
import Profile from '../Profile/index.js';
import PostSingle from './PostSingle.js';
import Filter from '../Filter/index.js';
import UserProfile from '../Pages/UserProfile'


function Home() {
    return (
        <Row className="main-row">
            <Col className="profile-section">
                <div className="header">
                    <img className='logo' src="../images/logo.png" />
                    <h1 className="title">Curb Alert</h1>
                    
                </div>
                <Profile />
            </Col>

            <Col xs={12} md={9} className="curb">
                <div className="curb-header">
                    <h2>The Curb</h2>
                    <Filter />
                </div>
                
                <div className="feed">
                    <Route exact path="/" component={Feed} />
                    <Route exact path="/post/:id" component={PostSingle} />
                    <Route exact path="/userprofile/" component={UserProfile} />
                </div>
                
            </Col>

        </Row>
    );
}

export default Home;