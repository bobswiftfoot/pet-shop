const { User, Category, Product, Review } = require('../models');

const resolvers = 
{
  Query: 
  {
    users: async () =>
    {
        return await User.find().populate({path: "reviews", populate: "product"});
    },  
    user: async(parent, { _id }) =>
    {
        return await User.findById(_id).populate({path: "reviews", populate: "product"});
    }, 
    categories: async () =>
    {
        return await Category.find().populate("subcategories");
    },
    subcategories: async(parent, { _id }) =>
    {
        return await Category.findById(_id);
    },
    products: async(parent, { category }) =>
    {
        const params = {};
        if(category)
            params.category = category;
        return await Product.find(params).populate("category");
    },
    product: async(parent, { _id }) =>
    {
      return await Product.findById(_id).populate("category").populate({path: "reviews", populate: "user"});
    },
    featuredProducts: async(parent, { category }) =>
    {
        const params = {};
        params.category = category;
        params.featuredProduct = true;
        return await Product.find(params).populate("category");
    },
    reviews: async(parent, { user, product }) =>
    {
        const params = {};
        if(user)
            params.user = user;
        else if(product)
            params.product = product;
        return await Review.find(params).populate("user").populate("product");       
    },
    review: async(parent, { _id }) =>
    {
        return await Review.findById(_id).populate("user").populate("product");
    }
  },
  Mutation: 
  {
    addUser: async(parent, args) =>
    {
        const user = await User.create(args);
        return user;
    },
    addCategory: async(parent, args) =>
    {
        const category = await Category.create(args);
        return category;
    },
    editCategory: async(parent, args) =>
    {
        const category = await Category.findOneAndUpdate(args._id, args);
        return category;
    },
    removeCategory: async(parent, { _id }) =>
    {
        const category = await Category.findOneAndDelete(_id);
        return category;
    },
    addProduct: async(parent, args) =>
    {
        const product = await Product.create(args);
        return product;
    },
    editProduct: async(parent, args) =>
    {
        const product = await Product.findOneAndUpdate(args._id, args);
        return product;
    },
    removeProduct: async(parent, { _id }) =>
    {
        const product = await Product.findOneAndDelete(_id);
        return product;
    },
    addReview: async(parent, args) =>
    {
        const review = await Review.create(args);

        await User.findOneAndUpdate(
            { _id: args.user}, 
            { $push: { reviews: review._id} });

        await Product.findOneAndUpdate(
            { _id: args.product}, 
            { $push: { reviews: review._id} });

        return review;
    },
    editReview: async(parent, args) =>
    {
        const review = await Review.findOneAndUpdate(args._id, args);
        return review;
    },
    removeReview: async(parent, { _id }) =>
    {
        const review = await Review.findOneAndRemove(_id);
        
        await User.findOneAndUpdate(
            { _id: review.user}, 
            { $pull: { reviews: _id} });

        await Product.findOneAndUpdate(
            { _id: review.product}, 
            { $pull: { reviews: _id} });

        return review;
    }
  }
};

module.exports = resolvers;