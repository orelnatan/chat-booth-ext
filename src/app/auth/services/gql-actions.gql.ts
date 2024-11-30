import { gql } from "apollo-angular";

export const AUTHENTICATE = gql`
  mutation authenticate($idToken: String!) {
    authenticate(idToken: $idToken) {
      customToken
    }
  }
`;