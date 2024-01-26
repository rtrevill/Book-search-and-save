const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]
  }

  type Book {
    _id: ID!
    authors: [String]!
    description: String
    bookId: String
    image: String
    link: String
    title: String
  }

  type Query {
    users: [User]
    getSingleUser(userId: ID!): User
    login(username: String, email: String, password: String!): User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User
    saveBook(userId: ID!, title: String!, bookId: String!, description: String!, image: String!, link: String!, authors: [String]!): User
    deleteBook(userId: ID!, bookId: String!):User
  }

`;

module.exports = typeDefs;
