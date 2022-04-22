import React from "react";
import { Card, Button } from 'react-bootstrap';

function Feed () {
    return (
        <Card id="feed-item" style={{ width: '35rem' }}>
            <Card.Img variant="top" src="../images/sofa.jpeg" />
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                Details of the free item would go here
                </Card.Text>
                <Button id="feed-button" variant="primary">Message or mark as taken?</Button>
            </Card.Body>
        </Card>
    );
}

export default Feed;