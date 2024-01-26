import { gql } from '@apollo/client';

export const CREATE_USER = gql`
    mutation createUser($username: String, $email: String, $password: String){
        createUser(username: $username, email: $email, password: $password){
            _id: ID
            username
            email
            password
            savedBooks
        }
    }
`;

export const CREATE_BOOK = gql`
    mutation saveBook($userId: ID!, $title: String, $bookId: String, $description: String){
        saveBook(userId: $userId, title: $title, bookId: $bookId, description: $description){
            _id: ID
            username
            email
            password
            savedBooks
        }
    }
`;

export const DELETE_BOOK = gql`
    mutation deleteBook($userId: ID!, $bookId: String){
        deleteBook(userId: $userId, bookId: $bookId){
            _id: ID
            username
            email
            password
            savedBooks
        }
    }
`;