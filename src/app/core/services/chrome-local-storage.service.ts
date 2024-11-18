import { Injectable } from "@angular/core";
import { Observable, from } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChromeLocalStorageService {
  public set<T>(records: T): Observable<void> {
    return from(chrome.storage.local.set({ ...records }))
  }

  public get<T>(keys: string[]): Observable<T> {
    return from((<unknown>chrome.storage.local.get(keys)) as Promise<T>);
  }

  public remove(keys: string[]): Observable<void> {
    return from(chrome.storage.local.remove(keys));
  }
}