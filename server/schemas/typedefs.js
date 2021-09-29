const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User 
  {
    _id: ID
    firstName: String
    lastName: String
    userName: String
    email: String
    reviews: [Review]
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
      reviews: [Review]
  }

  type Review
  {
      _id: ID
      reviewText: String
      rating: Float
      user: User
      product: Product
  }

  type Checkout {
    session: ID
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
    reviews(user: ID, product: ID): [Review]
    review(_id: ID!): Review
    checkout(products: [ID]!): Checkout
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
    addReview(reviewText: String!, rating: Float!, user: ID!, product: ID!): Review
    editReview(_id: ID!, reviewText: String, rating: Float): Review
    removeReview(_id: ID!): Review
  }
`;

module.exports = typeDefs;
