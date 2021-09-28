const { User, Category } = require('../models');

const resolvers = 
{
  Query: 
  {
    users: async () =>
    {
        return await User.find();
    },  
    user: async (parent, { _id }) =>
    {
        return await User.findById(_id);
    }, 
    categories: async () =>
    {
        return await Category.find();
    },
    subcategories: async (parent, { _id }) =>
    {
        return await Category.findById(_id);
    },
  },
  Mutation: 
  {
    addUser: async (parent, args) =>
    {
      const user = await User.create(args);

      return user;
    },
  }
};

module.exports = resolvers;