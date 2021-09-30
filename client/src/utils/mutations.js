<<<<<<< HEAD
import { gql } from '@apollo/client';
=======
import gql from 'graphql-tag';
>>>>>>> 6d43a92140da87e06fe716f6d1fa5d5deb4f17a6

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
      products {
        _id
<<<<<<< HEAD
        name
        description
        price
        quantity
        category {
          name
        }
=======
      name
      description
      price
      quantity
      category {
        name
      } 
>>>>>>> 6d43a92140da87e06fe716f6d1fa5d5deb4f17a6
      }
    }
  }
`;

export const ADD_USER = gql`
<<<<<<< HEAD
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
=======
  mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
>>>>>>> 6d43a92140da87e06fe716f6d1fa5d5deb4f17a6
      token
      user {
        _id
      }
    }
  }
<<<<<<< HEAD
`;
=======
`;
>>>>>>> 6d43a92140da87e06fe716f6d1fa5d5deb4f17a6
