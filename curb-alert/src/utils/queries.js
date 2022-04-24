import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
query  {
    users {
      username
      userDescription
      userImage
      email
      posts {
        _id
        itemTitle
        itemDescription
        itemCategory
        createdAt
      }
    }
  }
`


export const QUERY_POSTS = gql`
query  {
    posts {
      _id
      itemTitle
      itemDescription
      itemCategory
      imageURL
      createdAt
    }
  }
`