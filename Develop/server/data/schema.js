const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    savedBooks: [Book]
    bookCount: Int
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(userId: ID, username: String): User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): Auth
    saveBook(userId: ID!, bookData: BookInput!): User
    removeBook(userId: ID!, bookId: String!): User
  }

  input BookInput {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }
`;

module.exports = typeDefs;
