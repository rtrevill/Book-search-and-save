const { User } = require('../models');
const { signToken } = require('../utils/auth')

const resolvers = {
  Query: {
    users: async () => {
      return await User.find()
    },

    user: async (_,{userId}) => {
      return await User.findOne({_id: userId})
    },

    login: async (_,{username, email, password}) => {
      const user = await User.findOne({ $or: [{ username: username }, { email: email }] });
      if (!user) {
        return console.log("Can't find this user") ;
      }
  
      const correctPw = await user.isCorrectPassword(password);
  
      if (!correctPw) {
        return console.log('Wrong password!');
      }
      const token = signToken(user);
      console.log("Login approved");
      return { token, user};  
    },
  },

  Mutation: {
    createUser: async(_, {username, email, password}) => {
      const newUser = await User.create({username, email, password});
      return newUser;
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
      return updatedUser
      },
  },
};

module.exports = resolvers;
