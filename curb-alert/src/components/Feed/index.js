import React from "react";
import { Card } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { QUERY_POSTS } from '../../utils/queries'
import AddPost from '../AddPost'

import { Link } from 'react-router-dom'






function Feed() {
    const { loading, data } = useQuery(QUERY_POSTS);
    const posts = data?.posts || [];
    console.log(posts);

    return (

        posts.map(post =>
            <Link to={`/post/${post._id}`}>
                < Card id="feed-item" className="flex-wrap" style={{ width: '20vw', height: '55vh', margin: '.5rem' }}>
                    <Card.Title>{post.itemTitle}</Card.Title>
                    <Card.Img style={{ width: '90%', margin: '.5rem' }}
                        variant="top" src={post.imageURL} />

                </Card >
            </Link>)

    );
}

export default Feed;

