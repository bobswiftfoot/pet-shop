const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User 
  {
    _id: ID
    firstName: String
    lastName: String
    userName: String
    email: String
    orders: [Order]
    reviews: [Review]
    admin: Boolean
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
      image: String
      price: Float
      category: Category
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

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query 
  {
    me: User
    users: [User]
    user(_id: ID!): User
    categories: [Category]
    topCategories: [Category]
    subcategories(_id: ID!): [Category]
    products(category: ID): [Product]
    product(_id: ID!): Product
    order(_id: ID!): [Order]
    checkout(products: [ID]!): Checkout
    featuredProducts(category: ID!): [Product]
    reviews(user: ID, product: ID): [Review]
    review(_id: ID!): Review
  }

  type Mutation 
  {
    login(email: String!, password: String!): Auth
    addUser(firstName: String!, lastName: String!, userName: String!, email: String!, password: String!): User
    editUser(_id: ID!, firstName: String, lastName: String, userName: String, email: String, password: String): Auth
    removeUser(_id: ID!): User
    addCategory(name: String!, subcategories: [ID]): Category
    addOrder(products: [ID]!): Order
    editCategory(_id: ID!, name: String, subcategories: [ID]): Category
    removeCategory(_id: ID!): Category
    addProduct(name: String!, description: String, price: Float!, category: ID!, featuredProduct: Boolean): Product
    editProduct(_id: ID!, name: String, description: String, image: String, price: Float, category: ID, featuredProduct: Boolean): Product
    removeProduct(_id: ID!): Product
    addReview(reviewText: String!, rating: Float!, user: ID!, product: ID!): Review
    editReview(_id: ID!, reviewText: String, rating: Float): Review
    removeReview(_id: ID!): Review
  }
`;

module.exports = typeDefs;
