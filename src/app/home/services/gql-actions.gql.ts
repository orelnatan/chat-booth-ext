import { gql } from "apollo-angular";

export const USER_BOOTHS = gql`
  query userBooths($userId: String!) {
    userBooths(userId: $userId) {
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

export const LEAVE_BOOTH = gql`
  mutation leaveBooth($boothId: String!, $userId: String!) {
    leaveBooth(boothId: $boothId, userId: $userId)
  }
`;
