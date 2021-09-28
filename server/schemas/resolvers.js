const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');

const resolvers = 
{
  Query: 
  {
    user: async (parent, { _id }) =>
    {
        return await User.findById(_id);
    },
    users: async () =>
    {
        return await User.find();
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