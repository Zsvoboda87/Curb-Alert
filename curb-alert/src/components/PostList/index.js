import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DeletePost from '../UpdateProfile/DeletePost'

const PostList = ({ posts, title }) => {

    // if (!posts.length)

    return (
        <div>
            <div className='curb-header user-profile-title'>
                <h3>{title}</h3>
            </div>
            <div className="feed">
                {' '}
                {posts &&
                    posts.map(post => (
                        <div className='flex-center'>
                            <Link to={`/post/${post._id}`}>
                                < Card id="feed-item" className="flex-center" style={{ width: '23vw', height: '50vh', margin: '.5rem' }}>
                                    <Card.Title>{post.itemTitle}</Card.Title>
                                    <Card.Img id="card-img" style={{ width: '98%', height: '45vh', margin: 'auto' }}
                                        variant="top" src={post.imageURL} />
                                </Card >
                            </Link>
                            < DeletePost postId={post._id} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default PostList;