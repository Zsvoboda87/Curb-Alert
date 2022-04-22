import React from 'react';
import { Row, Col } from 'react-bootstrap';


function Home () {
    return (
        <Row>
            <Col>
                <h1>Logo and profile</h1>
            </Col>
            
            <Col>
                <h1>Main Feed</h1>
            </Col>
            
            <Col>
                <h1>weather</h1>
            </Col>
        </Row>
    );
}

export default Home;