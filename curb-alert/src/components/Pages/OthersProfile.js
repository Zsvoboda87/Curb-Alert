import React from 'react';
import PostList from '../PostList'
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_USER } from '../../utils/queries';



const OthersProfile = () => {
	const { username: userParam } = useParams();

	const { loading, data } = useQuery(QUERY_USER, {
		variables: { username: userParam }
	});

	const user = data?.user || {};

    console.log(userParam);
    console.log(user);

    

	if (loading) {
		return <div>Loading...</div>;
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

export default OthersProfile;