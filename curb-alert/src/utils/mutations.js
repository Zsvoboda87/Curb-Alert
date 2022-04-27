import { gql } from '@apollo/client';

export const ADD_POST = gql`
mutation addPost($itemTitle:String!, $itemDescription: String!, $imageURL: String, $itemCategory: String) {
    addPost(itemTitle: $itemTitle, itemDescription: $itemDescription, imageURL: $imageURL, itemCategory: $itemCategory) {
      _id
      itemTitle
      itemDescription
      itemCategory
      imageURL
      createdAt
      username   
    }
  }
`

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const UPDATE_PROFILE = gql`
mutation updateProfile(  $userImage: String, $userDescription: String) {
  updateProfile(
    userDescription: $userDescription,
    userImage: $userImage,
    )
    {
     _id
     username
     userImage
     userDescription
     email
     posts {
       _id
       
   }
  }
  }
  `