import { gql } from '@apollo/client';

export const ADD_POST = gql`
mutation addPost($itemTitle:String!, $itemDescription: String!, $imageURL: String, $itemCategory: String, $itemLat: String, $itemLng: String) {
  addPost(itemTitle: $itemTitle, itemDescription: $itemDescription, imageURL: $imageURL, itemCategory: $itemCategory, itemLat: $itemLat, itemLng: $itemLng) {
    _id
    itemTitle
    itemDescription
    imageURL
    itemCategory
    
    createdAt
    username
    
  }
}
`

export const REMOVE_POST = gql`
mutation removePost($_id: String) {
  removePost(_id: $_id) {
    _id
    username
    email
    posts {
      _id
      
  }
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

export const LOGOUT_USER = gql`
mutation Logout{
  logout(input: {}) {
    status
  }
}`


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

export const ADD_COMMENT = gql`
  mutation addComment($postId: ID!, $commentBody: String!) {
    addComment(postId: $postId, commentBody: $commentBody) {
      _id
      
      comments {
        _id
        commentBody
        createdAt
        username
      }
    }
  }
`