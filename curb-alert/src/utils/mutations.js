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