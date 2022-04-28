import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REMOVE_POST } from '../../utils/mutations';
import { Button } from 'react-bootstrap';


export default function RemovePost() {
    const [removePost, { error }] = useMutation(REMOVE_POST)

    const handleDelete = async event => {
        try {
            await updateProfile({
                variables: { post._id }
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