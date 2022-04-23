import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
query  {
    users {
      username
      
      email
      posts {
        _id
        itemDescription
        itemTitle
        createdAt
        reactionCount
        reactions {
           _id
        createdAt
        username
        reactionBody
        }
      }
    }
  }
`


export const QUERY_POSTS = gql`
query  {
    posts {
      _id
      username
      
      itemDescription
      createdAt
      reactionCount
      reactions {
         _id
      createdAt
      username
      reactionBody
      }
    }
  }
`