import React, { useState } from 'react';
import { Select } from '@chakra-ui/react'

function Filter() {
    return (
        <>
        <Select placeholder='Search for items'>
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