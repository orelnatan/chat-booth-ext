import { FirebaseTimestamp } from "@chat-booth/shared/firebase";

export interface Booth {
  id: string;
  joinedAt: FirebaseTimestamp;
}