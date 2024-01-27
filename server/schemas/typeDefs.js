const typeDefs = `
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]
  }

  type Book {
    _id: ID!
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    getSingleUser(userId: ID!): User
    
  }

  type Mutation {
    login(username: String, email: String, password: String!): Auth
    createUser(username: String!, email: String!, password: String!): Auth

    saveBook(userId: ID!, title: String!, bookId: String!, description: String!, image: String, link: String, authors: [String]): User
    deleteBook(userId: ID!, bookId: String!):User
  }

`;

module.exports = typeDefs;
