import React from 'react';
import { Button } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { REMOVE_POST } from '../../utils/mutations';

function DeletePost(postId) {
    const [removePost, { error }] = useMutation(REMOVE_POST)


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
        <Button
            onClick={handleDelete}
        >Delete Post</Button>
    )
}