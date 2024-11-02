import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';

import { ChromeMessageType } from "../models";

@Injectable()
export class ChromeUrlService {
  private _url$: BehaviorSubject<string> = new BehaviorSubject<string>("");

  constructor() {
   
  }

  get url$(): BehaviorSubject<string> {
    return this._url$;
  }
}