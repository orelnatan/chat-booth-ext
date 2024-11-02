import { ChromeMessageType } from "./chrome-message-type.enum";
import { Origin } from "./origin.enum";

export declare type Payload = {
  [key: string]: any;
};

export interface ChromeMessage {
  source?: Origin;
  type: ChromeMessageType;
  payload?: Payload;
}