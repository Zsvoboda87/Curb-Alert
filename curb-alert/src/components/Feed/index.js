import React from "react";
import { Card, Button } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { QUERY_POSTS } from '../../utils/queries'
import InitialFocus from '../AddPost'

function Feed() {
    const { loading, data } = useQuery(QUERY_POSTS);
    const posts = data?.posts || [];
    console.log(posts);

    return (
        <InitialFocus />


        // posts.map(post =>
        //     <Card id="feed-item" style={{ width: '35rem' }}>
        //         <Card.Img variant="top" src={post.imageURL} />
        //         <Card.Body>
        //             <Card.Title>{post.itemTitle}</Card.Title>
        //             <Card.Title>{post.itemCategory}</Card.Title>
        //             <Card.Text>
        //                 {post.itemDescription}
        //             </Card.Text>
        //             <Button id="feed-button" variant="primary">Message or mark as taken?</Button>
        //         </Card.Body>
        //     </Card>)
    );
}

export default Feed;

