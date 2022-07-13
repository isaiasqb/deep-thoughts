// This file will store all of the GraphQL query requests.
import { gql } from '@apollo/client';

//Wrapped the entire query code in a tagged template literal using the imported gql function. 
//We've also saved it as QUERY_THOUGHTS and exported it using the ES6 module export syntax.
//query will be used on the homepage of the application;
// it is imported to to the Home.js file in the pages directory
export const QUERY_THOUGHTS = gql`
  query thoughts($username: String) {
    thoughts(username: $username) {
      _id
      thoughtText
      createdAt
      username
      reactionCount
      reactions {
        _id
        createdAt
        username
        reactionBody
      }
    }
  }
`;

export const QUERY_THOUGHT = gql`
  query thought($id: ID!) {
    thought(_id: $id) {
      _id
      thoughtText
      createdAt
      username
      reactionCount
      reactions {
        _id
        createdAt
        username
        reactionBody
      }
    }
  }
`;