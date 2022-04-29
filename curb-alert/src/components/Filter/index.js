import React, { useState } from 'react';
import { Select } from '@chakra-ui/react'
import { QUERY_POSTS } from '../../utils/queries';
import { useQuery } from '@apollo/client';

function Filter() {
    const [categoryChange, handleCategoryChange] = useState('');
    //if category is nothing, then return all/true
    const { data } = useQuery(QUERY_POSTS);

    const filteredCategory = data?.posts?.category?.filter((category) => {
        return category.name === categoryChange
    })[0]
   
    return (
        <>
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
        </>
    )

}

export default Filter;