import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ChromeUrlService {
  private _url$: BehaviorSubject<string> = new BehaviorSubject<string>("");

  constructor() {
    // Get the current URL when the extension loads - on extension init. (will fire only once)
    chrome.runtime.sendMessage({ message: "getCurrentTabUrl" }, (response) => {
      console.log("Initial active tab URL:", response.activeTabUrl);

      this._url$.next(response.activeTabUrl);
    });

    // Get the current URL when: moving between pages, tab is refreshed, switching to another tab, etc... (will fire many times)
    chrome.runtime.onMessage.addListener((message) => {
      if (message.activeTabUrl) {
        console.log("Active tab URL:", message.activeTabUrl);

        this._url$.next(message.activeTabUrl);
      }
    });
  }

  get url$(): BehaviorSubject<string> {
    return this._url$;
  }
}