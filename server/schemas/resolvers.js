const { User, Category, Product } = require('../models');

const resolvers = 
{
  Query: 
  {
    users: async () =>
    {
        return await User.find();
    },  
    user: async(parent, { _id }) =>
    {
        return await User.findById(_id);
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
      return await Product.findById(_id).populate("category");
    },
    featuredProducts: async(parent, { category }) =>
    {
        const params = {};
        params.category = category;
        params.featuredProduct = true;
        return await Product.find(params).populate("category");
    },
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
    }
  }
};

module.exports = resolvers;