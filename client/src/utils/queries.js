import { gql } from '@apollo/client';

// export const QUERY_USER = gql`
//     query getSingleUser($userid: ID!){
//         getSingleUser(userId: $userid){
//             _id
//             username
//             email
//             password
//             savedBooks
//         }
//     }
// `;

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