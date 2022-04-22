// import the gql tagged template function
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
    itemDescription: String!
    imageURL: String
    createdAt: String
    username: String
    reactionCount: Int
    reactions: [Reaction]
  }

  type Reaction {
    _id: ID
    reactionBody: String
    createdAt: String
    username: String
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
    
    addPost(itemDescription: String!, imageURL: String): Post
    removePost(_id: String): User
    
    addReaction(_id: ID!, reactionBody: String!): Post
    
  }

  type Auth {
    token: ID!
    user: User
  }
`;

// export the typeDefs
module.exports = typeDefs;