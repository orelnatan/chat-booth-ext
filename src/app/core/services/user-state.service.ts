import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, map, of } from "rxjs";
import { Apollo, MutationResult } from "apollo-angular";

import { AuthCredentials } from "@chat-booth/auth/models";

import { User } from "../models";
import { GET_USER } from "./gql-actions.gql";

import * as FETCH_USER_BY_CREDENTIALS from 'src/assets/mocks/fetch-user-by-credentials.mock.json'; 

@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  private _user$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(
    private readonly apollo: Apollo
  ) {}

  public fetchUserByCredentials(credentials: AuthCredentials): Observable<User> {
    return this.apollo.query<{ getUser: User }>({
      query: GET_USER,
    }).pipe(
      map((response: MutationResult<{ getUser: User }>) => {
        return response.data.getUser;
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