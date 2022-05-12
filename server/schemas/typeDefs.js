const { gql } = require('apollo-server-express');


// create our typeDefs
const typeDefs = gql`

  type User {
    _id: ID
    username: String
    userImage: String
    userDescription: String
    email: String
    posts: [Post]
  }

  type Post {
    _id: ID
    itemTitle: String!
    itemDescription: String!
    imageURL: String
    itemCategory: String
    itemLat: String
    itemLng: String
    createdAt: String
    username: String
    comments: [Comment]
  }

  type Comment {
    _id: ID
    commentBody: String
    username: String
    createdAt: String
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    posts(username: String): [Post]
    post(_id: ID!): Post
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    
    updateProfile( userImage: String, userDescription: String): User
    
    addPost(itemTitle: String!, itemDescription: String!, imageURL: String, itemCategory:String, itemLat: String, itemLng: String): Post
    removePost(_id: String): User
    
    addComment(postId: ID!, commentBody: String!): Post
  }

  type Auth {
    token: ID!
    user: User
  }
`;

// export the typeDefs
module.exports = typeDefs;