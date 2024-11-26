import { gql } from "apollo-angular";

export const GET_BOOTHS = gql`
  query userBooths($userId: String!) {
    userBooths(userId: $userId) {
      id
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

export const GET_MESSAGES =  gql`
  query messages($boothId: String!, $limit: Int!) {
    messages(boothId: $boothId, limit: $limit) {
      id
      senderId
      boothId
      content
      createdAt
    }
  }
`;

export const SEND_MESSAGE =  gql`
  mutation sendMessage($boothId: String!, $userId: String!, $content: String!) {
    sendMessage(boothId: $boothId, userId: $userId, content: $content) {
      id
      senderId
      boothId
      content
      createdAt
    }
  }
`;

export const SUBSCRIBE_MESSAGES = gql`
  subscription messageAdded($boothId: String!) {
    messageAdded(boothId: $boothId) {
      id
      senderId
      boothId
      content
      createdAt
    }
  }
`;