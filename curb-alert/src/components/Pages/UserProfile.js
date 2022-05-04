import React from 'react';
import PostList from '../PostList'
import UpdateProfile from '../UpdateProfile';
import AddPost from '../AddPost';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_USER } from '../../utils/queries';



const UserProfile = () => {
    const { username: userParam } = useParams();
    
    const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
        variables: { username: userParam }
    });

    const user = data?.me || data?.user || {};

    if (loading) {
        return <div>Loading...</div>
    }
    
    return (
        <div>
            <div className='curb-header user-profile-title'>
                <h2>
                    Viewing {user.username}'s Profile
                </h2>

                <img className="user-profile-image" src={user.userImage} alt="profileImage"></img>
                <p className='about-me'>About Me</p>
                <p className='user-description'>
                    {user.userDescription}
                </p>
                <UpdateProfile />
                <AddPost />

            </div>
            <div>
                <PostList
                    posts={user.posts}
                    user={user.username}
                />
            </div>
        </div>
    )
};

export default UserProfile