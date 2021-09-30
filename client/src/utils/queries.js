import { gql } from '@apollo/client';

export const QUERY_ALL_USERS = gql`
    users 
    {
        _id
        firstName
        lastName
        userName
        email
        reviews 
        {
            _id
            reviewText
            rating
            product 
            {
                name
            }
        }
    }
`;

export const QUERY_USER = gql`
    query user($userId: ID!) 
    {
        user(_id: $userId) 
        {
            _id
            firstName
            lastName
            userName
            email
            reviews 
            {
                _id
                reviewText
                rating
                product 
                {
                    name
                }
            }
        }
    }
`;


export const QUERY_ALL_CATEGORIES = gql`
    categories
    {
        _id
        name
        subcategories 
        {
            _id
            name
        }
    }
`;

export const QUERY_SUBCATEGORIES = gql`
    query subcategories($id: ID!) 
    {
        subcategories(_id: $id) 
        {
            _id
            name
        }
    }
`;

export const QUERY_ALL_PRODUCTS = gql`
    products 
    {
        _id
        name
        description
        price
        category 
        {
            name
        }
        rating
        featuredProduct
        reviews 
        {
            reviewText
            user 
            {
                userName
            }
        }
    }
`;

export const QUERY_ALL_PRODUCTS_BY_CATEGORY = gql`
    query products($productsCategory: ID) 
    {
        products(category: $productsCategory) 
        {
            _id
            name
            description
            price
            category 
            {
                name
            }
            rating
            featuredProduct
            reviews 
            {
                reviewText
                user 
                {
                    userName
                }
            }
        }
    }
`;

export const QUERY_PRODUCT = gql`
    query product($productId: ID!) 
    {
        product(_id: $productId)
        {
            _id
            name
            description
            price
            category 
            {
                name
            }
            rating
            featuredProduct
            reviews 
            {
                reviewText
                user 
                {
                    userName
                }
            }
        }
    }
`;

export const QUERY_FEATURED_PRODUCTS = gql`
    query featuredProducts($featuredProductsCategory: ID!) 
    {
        featuredProducts(category: $featuredProductsCategory
        {
            _id
            name
            description
            price
            category 
            {
                name
            }
            rating
            featuredProduct
            reviews 
            {
                reviewText
                user 
                {
                    userName
                }
            }
        }
    }
`;

export const QUERY_REVIEWS = gql`
    query reviews($reviewsUser: ID, $reviewsProduct: ID) 
    {
        reviews(user: $reviewsUser, product: $reviewsProduct) 
        {
            _id
            reviewText
            rating
            user 
            {
                userName
            }
            product 
            {
                name
            }
        }
    }
`;

export const QUERY_REVIEW = gql`
    query reviews($reviewId: ID!) 
    {
        review(_id: $reviewId)
        {
            _id
            reviewText
            rating
            user 
            {
                userName
            }
            product 
            {
                name
            }
        }
    }
`;