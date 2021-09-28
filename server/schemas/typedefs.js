const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User 
  {
    _id: ID
    firstName: String
    lastName: String
    userName: String
    email: String
  }

  type Category 
  {
    _id: ID
    name: String
    subcategories: [Category]
  }

  type Query 
  {
    user(_id: ID!): User
    users: [User]
    categories: [Category]
    subcategories(_id: ID): [Category]
  }

  type Mutation 
  {
    addUser(firstName: String!, lastName: String!, userName: String!, email: String!, password: String!): User
  }
`;

module.exports = typeDefs;
