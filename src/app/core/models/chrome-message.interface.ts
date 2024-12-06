
export interface ChromeMessage {
  source?: ChromeMessageOrigin;
  type: ChromeMessageType;
  payload?: ChromeMessagePayload;
}

export enum ChromeMessageType {
  GoogleLoginInit = "GOOGLE_LOGIN_INIT",
  LoginSuccess = "LOGIN_SUCCESS",
  LoginFailed = "LOGIN_FAILED",
  LoginSessionClosed = "LOGIN_SESSION_CLOSED",
  AccessGranted = "ACCESS_GRANTED",
  AccessDenied = "ACCESS_DENIED",
  CurrentTabUrl = "CURRENT_TAB_URL",
}

export enum ChromeMessageOrigin {
  GLaDOS = "GLaDOS",
  ChatBooth = "CHAT_BOOTH"
}

export declare type ChromeMessagePayload = {
  [key: string]: any;
}
