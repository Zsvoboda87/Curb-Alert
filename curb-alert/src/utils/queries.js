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
`;


export const QUERY_USER = gql`
query user($username: String!) {
  user(username: $username) {
    _id
    username
    userImage
    email
    posts {
      _id
      itemTitle
      imageURL
      createdAt
    }
  }
}
`;


export const QUERY_POSTS = gql`
query  {
    posts {
      _id
      username
      itemTitle
      itemDescription
      itemCategory
      imageURL
      createdAt
    }
  }
`;

export const QUERY_POST = gql`
query post($id: ID!) {
  post(_id: $id) {
    _id
    username
    itemTitle
    itemDescription
    itemCategory
    imageURL
    username
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      userDescription
      userImage
      email
      posts {
        _id
        itemTitle
        itemCategory
        imageURL
        createdAt
      }
    }
  }
`;

export const QUERY_ME_BASIC = gql`
{
  me {
    _id
    username
    userDescription
    userImage
    email
    posts {
      _id
      itemTitle
      itemCategory
      imageURL
      createdAt
    }
  }
}
`;

