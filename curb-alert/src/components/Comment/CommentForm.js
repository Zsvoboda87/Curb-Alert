import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../../utils/mutations';
import { Card, Button } from 'react-bootstrap';

const CommentForm = ({ postId }) => {
  const [commentBody, setBody] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const [addComment, { error }] = useMutation(ADD_COMMENT);

  // update state based on form input changes
  const handleChange = (event) => {
    if (event.target.value.length <= 280) {
      setBody(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  // submit form
  const handleFormSubmit = async (event) => {
    console.log(commentBody)
    event.preventDefault();

    try {
      await addComment({
        variables: { postId, commentBody },
      });

      // clear form value
      setBody('');
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="commentform">
      <p
        className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}
      >
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form
        className="flex-center justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <textarea
          placeholder="Leave a comment on this post"
          value={commentBody}
          className="comment-form-input col-12"
          onChange={handleChange}
        ></textarea>

        <Button className="col-9 mt-2" id="button-singlePost" type="submit">
          Submit
        </Button>
      </form>

      {error && <div>Something went wrong...</div>}
    </div>
  );
};

export default CommentForm;
