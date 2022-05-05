import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../../utils/mutations';

import { Button } from 'react-bootstrap';
import { FormControl, Input } from '@chakra-ui/react';

const CommentForm = ({postId}) => {
  const [commentBody, setCommentBody] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addComment] = useMutation(ADD_COMMENT);

  // update state based on form input changes
  const handleChange = (event) => {
    if (event.target.value.length <= 280) {
      setCommentBody(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("working?")

    try {
      await addComment({
        variables: { commentBody, postId },
      });

      // clear form value
      setCommentBody('');
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };
  console.log(commentBody);
  return (       
      <FormControl>
        <Input placeholder="Leave a comment on this post"
          type='text'
          value={commentBody}
          onChange={handleChange}
        />
        Character Count: {characterCount}/280
        <Button id="button-singlePost" variant="primary" onClick={handleFormSubmit}>Submit Comment</Button>
      </FormControl>
     
  );
};

export default CommentForm;