const { AuthenticationError } = require('apollo-server-express');
const { Book, User } = require('../models');
const { signToken } = reqire('../utils/auth')

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
        if (context.user){
            return await User.findOne({ _id:context.user._id }).select('-__v -password');}
            throw new AuthenticationError('User not authenticated')
      
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user)
      return {token, user};
    },
    login: async (parent, { _id, techNum }) => {
      const user = await User.findOne(
        { email }
      );
      if (!user){
        throw new AuthenticationError('User not found')
      }
      const userPassword = await User.isCorrectPassword(password)
      if (!userPassword){
        throw new AuthenticationError('User not found')
      }
      const token = signToken(user)
      return {token, user};
    },
  },
};

module.exports = resolvers;
