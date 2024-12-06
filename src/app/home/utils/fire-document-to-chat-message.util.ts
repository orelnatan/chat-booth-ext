import { DocumentData } from "@angular/fire/compat/firestore";

import { ChatMessage } from "../models";

export function fireDocumentToChatMessage(document: DocumentData): ChatMessage {
  return {
    ...document,
    createdAt: `${document['createdAt'].seconds}.${document['createdAt'].nanoseconds}`
  } as ChatMessage
}