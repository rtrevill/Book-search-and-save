import { gql } from '@apollo/client';

export const QUERY_USER = gql`
    query getSingleUser($_id: ID!){
        getSingleUser(userId: $_id){
            _id
            username
            email
            password
            savedBooks
        }
    }
`;

