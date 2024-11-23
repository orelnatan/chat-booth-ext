import { gql } from "apollo-angular";

export const GET_USER_BOOTHS = gql`
  query getUserBooths($id: String!) {
    getUserBooths(id: $id) {
      boothId
      joinedAt
    }
  }
`;

export const JOIN_BOOTH = gql`
  mutation joinBooth($url: String!, $userId: String!) {
    joinBooth(url: $url, userId: $userId) {
      url
    }
  }
`;

