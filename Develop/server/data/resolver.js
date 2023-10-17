const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (_, { userId, username }) => {
      if (userId) {
        return User.findById(userId);
      }
      if (username) {
        return User.findOne({ username });
      }
    }
  },
  Mutation: {
    addUser: async (_, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new Error('Incorrect password');
      }

      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (_, { userId, bookData }) => {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { savedBooks: bookData } },
        { new: true }
      );
      return updatedUser;
    },
    removeBook: async (_, { userId, bookId }) => {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      );
      return updatedUser;
    }
  }
};

module.exports = resolvers;
