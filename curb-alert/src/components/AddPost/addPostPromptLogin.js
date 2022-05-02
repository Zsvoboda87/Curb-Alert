import React from 'react';
import { Button } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { REMOVE_POST } from '../../utils/mutations';

const handlePrompt = () => {
    window.alert('Sign Up or Login to Contribute')

}

export default function AddPostPromptLogin() {


    return (
        <Button id="button"
            onClick={handlePrompt}
        >Add an Item</Button>
    )
}