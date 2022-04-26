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
            < Card id="feed-item" style={{ width: '35rem' }}>
                <Link to={`/post/${post._id}`}>
                    <Card.Title>{post.itemTitle}</Card.Title>
                    <Card.Img variant="top" src={post.imageURL} />
                    <Card.Body>
                        {/* <Card.Text>
                            {post.itemDescription}
                        </Card.Text> */}
                        {/* <Button id="feed-button" variant="primary">Message or mark as taken?</Button> */}
                    </Card.Body>
                </Link>
            </Card >)

    );
}

export default Feed;

