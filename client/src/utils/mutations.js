import { gql } from '@apollo/client';

export const CREATE_USER = gql`
mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        username
        email
      }
    }
  }
`;

export const CREATE_BOOK = gql`
    mutation saveBook($userId: ID!, $title: String!, $bookId: String!, $description: String!, $image: String, $link: String, $authors: [String]) {
        saveBook(userId: $userId, title: $title, bookId: $bookId, description: $description, image: $image, link: $link, authors: $authors) {
        _id
        username
        email
        password
        savedBooks {
            _id
            authors
            description
            bookId
            image
            link
            title
        }
        }
    }
`;


export const DELETE_BOOK = gql`
    mutation deleteBook($userId: ID!, $bookId: String!) {
        deleteBook(userId: $userId, bookId: $bookId) {
        _id
        username
        email
        savedBooks {
            _id
            authors
            description
            bookId
            image
            link
            title
        }
        }
    }
`;


export const LOGIN_USER = gql`
    mutation login($password: String!, $username: String, $email: String!) {
        login(password: $password, username: $username, email: $email) {
        token
        user {
            _id
            username
            email
            savedBooks {
            _id
            authors
            description
            bookId
            image
            link
            title
            }
        }
        }
    }
`;

