import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_POST } from '../../utils/queries';

export default function PostSingle() {
    const { id: postId } = useParams();

    const { loading, data } = useQuery(QUERY_POST, {
        variables: { id: postId }
    });

    const post = data?.post || {};

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Hey{post.itemTitle}</h1>
            <h2>{post.itemDescription}</h2>
            <h3>{post.itemCategory}</h3>
            <h4>{post.imageURL}</h4>


        </div>

    )

};