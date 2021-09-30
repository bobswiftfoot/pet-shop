import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($addUserFirstName: String!, $addUserLastName: String!, $addUserUserName: String!, $addUserEmail: String!, $addUserPassword: String!) 
  {
    addUser(firstName: $addUserFirstName, lastName: $addUserLastName, userName: $addUserUserName, email: $addUserEmail, password: $addUserPassword)
    {
      _id
      firstName
      lastName
      userName
      email
    }
  }
`;

export const ADD_CATEGORY = gql`
  mutation addCategory($addCategoryName: String!, $addCategorySubcategories: [ID]) 
  {
    addCategory(name: $addCategoryName, subcategories: $addCategorySubcategories) 
    {
      _id
      name
      subcategories 
      {
        _id
        name
      }
    }
  }
`;

export const EDIT_CATEGORY = gql`
  mutation editCategory($editCategoryId: ID!, $editCategoryName: String, $editCategorySubcategories: [ID]) 
  {
    editCategory(_id: $editCategoryId, name: $editCategoryName, subcategories: $editCategorySubcategories) 
    {
      _id
      name
      subcategories 
      {
        _id
        name
      }
    }
  }
`;

export const REMOVE_CATEGORY = gql`
  mutation removeCategory($removeCategoryId: ID!) 
  {
    removeCategory(_id: $removeCategoryId) 
    {
      _id
      name
      subcategories 
      {
        name
        _id
      }
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation addProduct($addProductName: String!, $addProductPrice: Float!, $addProductCategory: ID!, $addProductDescription: String, $addProductFeaturedProduct: Boolean) 
  {
    addProduct(name: $addProductName, price: $addProductPrice, category: $addProductCategory, description: $addProductDescription, featuredProduct: $addProductFeaturedProduct) 
    {
      _id
      name
      description
      price
      category 
      {
        _id
        name
      }
      featuredProduct
    }
  }
`;

export const EDIT_PRODUCT = gql`
  mutation editProduct($editProductId: ID!, $editProductName: String, $editProductDescription: String, $editProductPrice: Float, $editProductCategory: ID, $editProductFeaturedProduct: Boolean, $editProductRating: Float) 
  {
    editProduct(_id: $editProductId, name: $editProductName, description: $editProductDescription, price: $editProductPrice, category: $editProductCategory, featuredProduct: $editProductFeaturedProduct, rating: $editProductRating) 
    {
      _id
      name
      description
      price
      category 
      {
        name
        _id
      }
      featuredProduct
    }
  }
`;

export const REMOVE_PRODUCT = gql`
  mutation removeProduct($removeProductId: ID!) 
  {
    removeProduct(_id: $removeProductId) 
    {
      _id
      name
      description
      price
      category {
        _id
        name
      }
      featuredProduct
    }
  }
`;

export const ADD_REVIEW = gql`
  mutation addReview($addReviewReviewText: String!, $addReviewRating: Float!, $addReviewUser: ID!, $addReviewProduct: ID!) 
  {
    addReview(reviewText: $addReviewReviewText, rating: $addReviewRating, user: $addReviewUser, product: $addReviewProduct) 
    {
      _id
      reviewText
      rating
      user 
      {
        _id
        userName
      }
      product 
      {
        _id
        name
      }
    }
  }
`;

export const EDIT_REVIEW = gql`
  mutation editReview($editReviewId: ID!, $editReviewReviewText: String, $editReviewRating: Float) 
  {
    editReview(_id: $editReviewId, reviewText: $editReviewReviewText, rating: $editReviewRating) 
    {
      _id
      reviewText
      rating
      user 
      {
        _id
        userName
      }
      product 
      {
        _id
        name
      }
    }
  }
`;

export const EDIT_REVIEW = gql`
  mutation removeReview($removeReviewId: ID!) 
  {
    removeReview(_id: $removeReviewId) 
    {
      _id
      reviewText
      rating
      user 
      {
        _id
        userName
      }
      product 
      {
        _id
        name
      }
    }
  }
`;