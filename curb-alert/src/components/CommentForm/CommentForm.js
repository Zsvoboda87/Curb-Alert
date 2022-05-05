import React, { useState } from 'react';

import { useQuery, useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../../utils/mutations';

import { Button } from 'react-bootstrap';
import { FormControl, Input } from '@chakra-ui/react';
import { QUERY_COMMENTS } from '../../utils/queries';

const CommentForm = () => {
  const [commentBody, setCommentBody] = useState(data);
  const [characterCount, setCharacterCount] = useState(0);

  const [addComment, { error }] = useMutation(ADD_COMMENT, {
      update(cache, { data: { addComment } }) {
          try {
              const { comments } = cache.readQuery({ query: QUERY_COMMENTS });

              cache.writeQuery({
                  query: QUERY_COMMENTS,
                  data: { comments: [addComment, ...comments] }
              });
            } catch (e) {
              console.error(e)
            }
      }
  });

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

    try {
      await addComment({
        variables: { commentBody, createdAt },
      });

      // clear form value
      setBody('');
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

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
