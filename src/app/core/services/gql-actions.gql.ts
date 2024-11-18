import { gql } from "apollo-angular";

export const GET_USER = gql`
  query getUser($id: String!) {
    getUser(id: $id) {
      displayName
      email
      picture
    }
  }
`;