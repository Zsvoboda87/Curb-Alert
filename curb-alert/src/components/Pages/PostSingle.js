import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_POST } from '../../utils/queries';
import { Card, Button } from 'react-bootstrap';

import { Link } from 'react-router-dom';
import CardHeader from 'react-bootstrap/esm/CardHeader';

export default function PostSingle() {
    const { id: postId } = useParams();

    const { loading, data } = useQuery(QUERY_POST, {
        variables: { id: postId }
    });

    const post = data?.post || {};

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Card id="feed-item" style={{ width: '35rem' }}>
                <CardHeader id="postSingle-header" >
                    <Button id="feed-button" variant="primary">Message the Owner</Button>
                    <Link to={`/`}>
                        <Button id="feed-button" variant="primary">Back to the Curb</Button>
                    </Link>
                </CardHeader>
                <Card.Img variant="top" src={post.imageURL} />
                <Card.Body>
                    <Card.Title>{post.itemTitle}</Card.Title>
                    <Card.Title>{post.itemCategory}</Card.Title>
                    <Card.Text>
                        {post.itemDescription}
                    </Card.Text>

                </Card.Body>
            </Card>


        </div>



    )

};