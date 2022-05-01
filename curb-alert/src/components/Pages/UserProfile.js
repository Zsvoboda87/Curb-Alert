import React from 'react';
import PostList from '../PostList'
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
            <div>
                <h2>
                    Viewing {user.username}'s Profile
                </h2>
            </div>
            <div>
                <PostList
                    posts={user.posts}
                    title={`${user.username}'s posts`}
                />
            </div>
        </div>
    )
};

export default UserProfile