import { User } from "@chat-booth/core/models";
import { FirebaseTimestamp } from "@chat-booth/shared/firebase/models";

import { Booth } from "./booth.interface";

export interface ChatMessage {
  id: string;
  sender: User;
  booth: Booth;
  content: string;
  replies: ChatMessage[];
  createdAt: FirebaseTimestamp;
  editedAt: FirebaseTimestamp;
}