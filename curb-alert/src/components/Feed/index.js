import React, { State, useState } from "react";
import { Card } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { QUERY_POSTS } from '../../utils/queries'

import AddPost from '../AddPost'
import { Select } from '@chakra-ui/react'


import { Link } from 'react-router-dom'


function Feed() {
    const { loading, data } = useQuery(QUERY_POSTS);
    const posts = data?.posts || [];
    console.log(posts);

    const [categoryChange, handleCategoryChange] = useState('');
    console.log(categoryChange);

    const filteredPosts = posts.filter((post) => {
        if (categoryChange === '')
        return true
        return post.itemCategory === categoryChange
    })
   
    console.log(filteredPosts);


    return (
        <div>
            <div className="curb-header">
                    <h2>The Curb</h2>
                <Select placeholder='Search for items' onChange={(e) => handleCategoryChange(e.target.value)}>
                <option value='building materials'>Building Materials</option>
                <option value='clothing'>Clothing</option>
                <option value='furniture'>Furniture</option>
                <option value='home and garden'>Home and Garden</option>
                <option value='office supplies'>Office Supplies</option>
                <option value='pet supplies'>Pet Supplies</option>
                <option value='sports equipment'>Sports Equipment</option>
                <option value='tools'>Tools</option>
                <option value='other'>Other</option>
                </Select>
            </div>
            <div>
                { filteredPosts.map(post =>
                <div>
                    <Link to={`/post/${post._id}`}>
                    < Card id="feed-item" className="flex-center" style={{ width: '23vw', height: '55vh', margin: '.5rem' }}>
                        <Card.Title>{post.itemTitle}</Card.Title>
                        <Card.Img style={{ width: '98%', margin: 'auto' }}
                            variant="top" src={post.imageURL} />

                    </Card >
                </Link>
                </div>
                )}
            </div>
            
        </div>
    
    );
}

export default Feed;

