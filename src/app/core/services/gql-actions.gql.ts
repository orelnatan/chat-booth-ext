import { gql } from "apollo-angular";

export const USER = gql`
  query user($userId: String!) {
    user(userId: $userId) {
      name
      email
      picture
      phone
      createdAt
    }
  }
`;