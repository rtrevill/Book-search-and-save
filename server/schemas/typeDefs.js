const typeDefs = `
  type User {
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
  }

`;

module.exports = typeDefs;
