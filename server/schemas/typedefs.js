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

  type Product
  {
      _id: ID
      name: String
      description: String
      price: Float
      category: Category
      rating: Float
      featuredProduct: Boolean
  }

  type Query 
  {
    users: [User]
    user(_id: ID!): User
    categories: [Category]
    subcategories(_id: ID!): [Category]
    products(category: ID): [Product]
    product(_id: ID!): Product
    featuredProducts(category: ID!): [Product]
  }

  type Mutation 
  {
    addUser(firstName: String!, lastName: String!, userName: String!, email: String!, password: String!): User
    addCategory(name: String!, subcategories: [ID]): Category
    editCategory(_id: ID!, name: String, subcategories: [ID]): Category
    removeCategory(_id: ID!): Category
    addProduct(name: String!, description: String, price: Float!, category: ID!, featuredProduct: Boolean): Product
    editProduct(_id: ID!, name: String, description: String, price: Float, category: ID, featuredProduct: Boolean, rating: Float): Product
    removeProduct(_id: ID!): Product
  }
`;

module.exports = typeDefs;
