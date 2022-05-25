import React, { useState } from "react";
import { Card } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { QUERY_POSTS } from '../../utils/queries'
import { Select } from '@chakra-ui/react'

import { Link } from 'react-router-dom'
import ReactPaginate from "react-paginate";


function Feed() {
    const { loading, data } = useQuery(QUERY_POSTS);
    const posts = data?.posts || [];

    const [categoryChange, handleCategoryChange] = useState('');


    const filteredPosts = posts.filter((post) => {
        if (categoryChange === '')
            return true
        return post.itemCategory === categoryChange
    })

    const [pageNumber, setPageNumber] = useState(0);

    const postsPerPage = 10
    const pagesVisited = pageNumber * postsPerPage

    const displayPosts = filteredPosts
        .slice(pagesVisited, pagesVisited + postsPerPage)
        .map(post => {
            return (
                <Link to={`/post/${post._id}`}>
                    < Card
                        key={post._id} id="feed-item" className="flex-center" >
                        <Card.Title>{post.itemTitle}</Card.Title>
                        <Card.Img id="card-img"
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
                    <option value='electronics'>Electronics</option>
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
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
            />

        </div>

    );
}

export default Feed;

