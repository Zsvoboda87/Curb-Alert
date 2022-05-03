import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { REMOVE_POST } from '../../utils/mutations';

export default function DeletePost(postId) {
    const [removePost, { error }] = useMutation(REMOVE_POST)

    const handleDelete = async () => {
        try {
            await removePost({
                variables: { _id: postId.postId }
            }).then(
                window.location.reload()
            );
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <Button id="button"
            onClick={handleDelete}
        >Delete Post</Button>
    )
}