const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]
  }

  type Book {
    authors: [String]!
    description: String
    bookId: String
    image: String
    link: String
    title: String
  }

  type Query {
    users: [User]
    user(userId: ID!): User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User
    saveBook(_id: ID!, title: String!): User
  }

`;

module.exports = typeDefs;
