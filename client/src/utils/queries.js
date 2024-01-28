import { gql } from '@apollo/client';

export const QUERY_USER = gql`
    query getSingleUser($userId: ID!) {
        getSingleUser(userId: $userId) {
        username
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

export const QUERY_ALL =  gql`
    query users {
        users {
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