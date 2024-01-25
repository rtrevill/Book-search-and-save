const { User } = require('../models');

const resolvers = {
  Query: {
    users: async () => {
      return await User.find()
    },

    user: async (_,{userId}) => {
      return await User.findOne({_id: userId})
    },
  },

  Mutation: {
    createUser: async(_, {username, email, password}) => {
      const newUser = await User.create({username, email, password});
      return newUser;
    },

    saveBook: async(_,{_id, title}) => {
      const newBook = await User.findOneAndUpdate(
        {_id: _id},
        { $addToSet: { savedBooks: {title: title} } },
        { new: true, runValidators: true }
      );
      return newBook
    }
  }
};

module.exports = resolvers;
