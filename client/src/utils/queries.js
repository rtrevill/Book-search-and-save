import { gql } from '@apollo/client';

export const QUERY_USER = gql`
    query getSingleUser($_id: String){
        getSingleUser(_id: $_id){
            _id
            username
            email
            password
            savedBooks
        }
    }
`;

export const QUERY_LOGIN = gql`
    query login($username: String, $email: String, $password: String){
        token
        _id
        username
        email
        password
        savedBooks
    }`