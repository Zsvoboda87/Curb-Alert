import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_POST } from '../../utils/queries';
import DisplayMap from '../AddPost/DisplayMap';


import { Card, Button } from 'react-bootstrap';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import { isRequiredArgument } from 'graphql';

import CommentList from '../Comment/index';
import CommentForm from '../Comment/CommentForm';
import Auth from '../../utils/auth';




export default function PostSingle() {
    const { id: postId } = useParams();
    const { loading, data } = useQuery(QUERY_POST, {
        variables: { id: postId }
    });
    const post = data?.post || {};
    console.log(post)

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='flex-center'>
            <Card id="feed-item" style={{ width: '50vw' }} >
                <CardHeader id="postSingle-header" className='flex-space-betweeen' >
                    <Button id="button-singlePost" variant="primary">Message the Owner</Button>
                    <Link to={`/`}>
                        <Button id="button-singlePost" variant="primary">Back to the Curb</Button>
                    </Link>
                </CardHeader>

                <Card.Body className='flex-center'>
                    <Card.Title>{post.itemTitle}</Card.Title>
                    <Card.Text>
                        <div>
                            <div className='post-title-item-link'>
                                posted by: {' '}
                                <Link to={`/userprofile/${post.username}`}>

                                    {post.username}

                                </Link>
                            </div>
                            <div className='post-title-item'>
                                {post.itemDescription}
                            </div>
                        </div>
                    </Card.Text>
                    <Card.Img variant="top" src={post.imageURL} />
                </Card.Body>

                {post.comments.length > 0 && (
                    <CommentList comments={post.comments} />
                )}
                {Auth.loggedIn() && <CommentForm postId={post._id} />}
            </Card>

            <div >
                <DisplayMap />
            </div>

        </div >
    )

};