import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Feed from '../Feed/index.js';
import Profile from '../Profile/index.js';
import PostSingle from './PostSingle.js';
import UserProfile from './UserProfile';
import OthersProfile from './OthersProfile'




function Home() {
    return (
        <Row className="main-row">
            <Col className="profile-section">
                <Link to={'/'}> 
                    <div className="header">
                        
                        <img className='logo' src="../images/logo.png" alt="logo" />
                        
                        <h1 className="title">Curb Alert</h1>

                    </div>
                </Link>
                <Profile />
            </Col>

            <Col xs={12} md={9} className="curb">


                <Route exact path="/" component={Feed} />
                <Route exact path="/post/:id" component={PostSingle} />
                <Route exact path="/userprofile" component={UserProfile} />
                <Route exact path="/userprofile/:username" component={OthersProfile} />


            </Col>

        </Row>
    );
}

export default Home;