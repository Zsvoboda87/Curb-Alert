import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { REMOVE_POST } from '../../utils/mutations';
import { Button } from 'react-bootstrap';
import { QUERY_ME, QUERY_POSTS } from '../../utils/queries';


const PostList = ({ posts, user }) => {
    const [removePost, { error }] = useMutation(REMOVE_POST, {
        update(cache, {data: { removePost }}) {

            try {
                const { me } = cache.readQuery({ query: QUERY_ME });

                cache.writeQuery({
                    query: QUERY_ME,
                    data: { me: { ...me, posts: [...me.posts.filter((post) => post._id !== removePost._id)]}}
                })
            } catch (e) {
                console.warn('First thought insertion by user')
            }

            // const { posts } = cache.readQuery({ query: QUERY_POSTS});

            // cache.writeQuery({
            //     query:  QUERY_POSTS,
            //     data: { posts: [...posts] }
            // });
        }
    });

    if (!posts || !posts.length) {
        return <p>add some things to your curb!</p>;
    }

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
            <div className='user-profile-subtitle'>
                <h2>{`${user}'s posts`}</h2>
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
                            <Button id="delete-button" onClick={() =>handleDelete(post._id)}>Delete Post</Button>
                        </Card >
                    ))
                }
            </div>
        </div>
    )
}

// const PostList = ({ posts, title }) => {

//     if (!posts || !posts.length) {
//         return <p>{title}, add some things to your curb!</p>;
//     }

//     return (
//         <div>
//             <div className='curb-header user-profile-title'>
//                 <h3>{title}</h3>
//             </div>
//             <div className="feed">
//                 {' '}
//                 {posts &&
//                     posts.map(post => (
//                         <Link to={`/post/${post._id}`}>
//                             < Card id="feed-item" className="flex-center" style={{ width: '23vw', height: '50vh', margin: '.5rem' }}>
//                                 <Card.Title>{post.itemTitle}</Card.Title>
//                                 <Card.Img id="card-img" style={{ width: '98%', height: '45vh', margin: 'auto' }}
//                                     variant="top" src={post.imageURL} />

//                             </Card >
//                         </Link>
//                     ))
//                 }
//             </div>
//         </div>
//     )
// }

export default PostList;