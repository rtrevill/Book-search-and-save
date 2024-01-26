import { gql } from '@apollo/client';

export const CREATE_USER = gql`
    mutation createUser($username: String, $email: String, $password: String){
        createUser(username: $username, email: $email, password: $password){
            token
            user {
            username
            email
            }
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

export const LOGIN_USER = gql`
    mutation login($username: String, $email: String, $password: String){
        login(username: $username, email: $email, password: $password){
            token
            user {
                _id
                username
                email
                savedBooks
            }
        }
    }
`;