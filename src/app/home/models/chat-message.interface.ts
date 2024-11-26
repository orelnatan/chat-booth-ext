import { FirebaseTimestamp } from "@chat-booth/shared/firebase/models";

export interface ChatMessage {
  id: string;
  senderId: string;
  boothId: string;
  content: string;
  createdAt: FirebaseTimestamp;
}

   