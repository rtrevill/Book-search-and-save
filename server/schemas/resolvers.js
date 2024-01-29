const { User } = require('../models');
const { signToken, AuthenticationError} = require('../utils/auth')

const resolvers = {
  Query: {
    users: async () => {
      return await User.find()
    },

    getSingleUser: async (_,{userId}) => {
      return await User.findOne({_id: userId});
      // return await User.findOne({_id: userId})
    },

  },

  Mutation: {
    login: async (_,{username, email, password}) => {
      const user = await User.findOne({ $or: [{ username: username }, { email: email }] });
      if (!user) {
        throw AuthenticationError;
      }
  
      const correctPw = await user.isCorrectPassword(password);
  
      if (!correctPw) {
        throw AuthenticationError;
      }
      const token = signToken(user);
      return { token, user};  
    },

    createUser: async(_, {username, email, password}) => {
      const user = await User.create({username, email, password});
      const token = signToken(user)
      return { token, user};
    },

    saveBook: async(_,{userId, title, bookId, description, image, link, authors}) => {
      const newBook = await User.findOneAndUpdate(
        {_id: userId},
        { $addToSet: { savedBooks: {
          title: title,
          bookId: bookId,
          description: description,
          image: image,
          link: link,
          authors: authors} } },
        { new: true, runValidators: true }
      );
      return newBook
    },

    deleteBook: async(_,{userId, bookId}) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { savedBooks: { bookId: bookId } } },
        { new: true }
      );
      console.log(updatedUser);
      return updatedUser
      },
  },
};

module.exports = resolvers;
