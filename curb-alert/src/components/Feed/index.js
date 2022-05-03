import React, { State, useState } from "react";
import { Card } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { QUERY_POSTS } from '../../utils/queries'

import AddPost from '../AddPost'
import { Select } from '@chakra-ui/react'

import { Link } from 'react-router-dom'
import ReactPaginate from "react-paginate";


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

    const [pageNumber, setPageNumber] = useState(0);

    const postsPerPage = 10
    // ex pagesVisited for page 4 - 40
    const pagesVisited = pageNumber * postsPerPage

    // ex. page 4 = post 40 -> 50 
    const displayPosts = filteredPosts
        .slice(pagesVisited, pagesVisited + postsPerPage )
        .map(post => {
            return (
                <Link to={`/post/${post._id}`}>
                < Card id="feed-item" className="flex-center" style={{ width: '23vw', height: '50vh', margin: '.5rem' }}>
                    <Card.Title>{post.itemTitle}</Card.Title>
                    <Card.Img id="card-img" style={{ width: '98%', height: '45vh', margin: 'auto' }}
                        variant="top" src={post.imageURL} />
    
                </Card >
                </Link> 
            );
        });
           
        const pageCount = Math.ceil(filteredPosts.length / postsPerPage);

        const changePage = ({ selected }) => {
            setPageNumber(selected);
        }

    return (
        <div>
            <div className="curb-header" >
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
            <div className="feed">
                {displayPosts}
            </div>
            <ReactPaginate
            nextLabel="Next"
            previousLabel="Previous"
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"pagination-btn"}
            renderOnZeroPageCount={null}
            />

        </div>

    );
}

export default Feed;

