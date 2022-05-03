import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { REMOVE_POST } from '../../utils/mutations';
import { Button } from 'react-bootstrap';


const PostList = ({ posts, title }) => {
    const [removePost, { error }] = useMutation(REMOVE_POST);
    
    // if (!posts.length)

    const handleDelete = async (postId) => {
        console.log(postId)
        try {
            await removePost({
                variables: { _id: postId }
            });
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div>
            <div className='curb-header user-profile-title'>
                <h3>{title}</h3>
            </div>
            <div className="feed">
                {' '}
                {posts &&
                    posts.map(post => (
                        
                        < Card id="feed-item" className="flex-center" style={{ width: '23vw', height: '50vh', margin: '.5rem' }}>
                            <Link to={`/post/${post._id}`}>
                                <Card.Title>{post.itemTitle}</Card.Title>
                                <Card.Img id="card-img" style={{ width: '98%', height: '45vh', margin: 'auto' }}
                                    variant="top" src={post.imageURL} 
                                />
                            </Link>
                            <Button id="button" onClick={handleDelete(post._id)}>Delete Post</Button>
                        </Card >
                    ))
                }
            </div>
        </div>
    )
}

export default PostList;