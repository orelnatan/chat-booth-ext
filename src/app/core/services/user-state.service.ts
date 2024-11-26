import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, map, of } from "rxjs";
import { Apollo, MutationResult } from "apollo-angular";

import { User } from "../models";
import { USER } from "./gql-actions.gql";

import * as USER_MOCK from 'src/assets/mocks/user-mock.json'; 

@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  private _user$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(
    private readonly apollo: Apollo
  ) {}

  public fetchCurrentActiveUser(): Observable<User> {
    return this.apollo.query<{ user: User }>({
      query: USER,
      fetchPolicy: 'no-cache'
    }).pipe(
      map((response: MutationResult<{ user: User }>) => {
        if(!response.data.user) throw new Error(
          'Apollo GraphQL error occurred, at USER ❌');

        return response.data.user;
      })
    )
  }

  public set user(user: User) {
    this._user$.next(user);
  }

  public get user$(): BehaviorSubject<User> {
    return this._user$;
  }
}