const typeDefs = `
  type User {
    username: String
    email: String
  }

  type Query {
    users: [User]
  }

`;

module.exports = typeDefs;
