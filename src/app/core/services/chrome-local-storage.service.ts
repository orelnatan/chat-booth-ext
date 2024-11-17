import { Injectable } from "@angular/core";

@Injectable()
export class ChromeLocalStorageService {
  public set<T>(records: Record<string, T>): Promise<void> {
    return chrome.storage.local.set({ ...records })
  }

  public get<T>(keys: string[]): Promise<Record<string, T>> {
    return chrome.storage.local.get(keys);
  }

  public remove(keys: string[]): Promise<void> {
    return chrome.storage.local.remove(keys);
  }
}