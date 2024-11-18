import { gql } from "apollo-angular";

export const AUTHENTICATE_USER = gql`
  mutation login($idToken: String!) {
    login(idToken: $idToken) {
      authorized
    }
  }
`;