import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';

import { ChromeMessage, MessageType } from "../models";

@Injectable()
export class ChromeUrlCycleHooksService {
  private _url$: BehaviorSubject<string> = new BehaviorSubject<string>("");

  constructor() {
    // Get the current URL when the extension loads - on extension init. (will fire only once)
    chrome.runtime.sendMessage({ type: MessageType.CurrentTabUrl } as ChromeMessage, (response: ChromeMessage) => { 
      if(response.type === MessageType.CurrentTabUrl) {
        this._url$.next(response.payload!['activeTabUrl']);
      }
    });

    // Get the current URL when moving between pages, tab is refreshed, switching to another tab, etc... (will fire many times)
    chrome.runtime.onMessage.addListener((message: ChromeMessage) => {
      if(message.type === MessageType.CurrentTabUrl) {
        if (message.payload!['activeTabUrl']) {
          this._url$.next(message.payload!['activeTabUrl']);
        }
      }
    });
  }

  get url$(): BehaviorSubject<string> {
    return this._url$;
  }
}