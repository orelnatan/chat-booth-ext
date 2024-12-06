
export interface ChatMessage {
  id: string;
  senderId: string;
  boothId: string;
  content: string;
  createdAt: string;
  parentMessageId?: string;
}

   