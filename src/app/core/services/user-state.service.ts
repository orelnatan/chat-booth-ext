import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, map } from "rxjs";
import { Apollo, MutationResult } from "apollo-angular";

import { AuthCredentials } from "@chat-booth/auth/models";

import { User } from "../models";
import { GET_USER } from "./gql-actions.gql";

@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  private _user$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(
    private readonly apollo: Apollo
  ) {}

  fetchUserByCredentials(credentials: AuthCredentials): Observable<User> {
    return this.apollo.query<{ getUser: User }>({
      query: GET_USER,
      context: {
        headers: {
          Authorization: `Bearer ${credentials.idToken}`
        }
      },
      variables: {
        id: credentials.uid
      },
    }).pipe(
      map((response: MutationResult<{ getUser: User }>) => {
        this._user$.next(response.data.getUser);

        return response.data.getUser;
      })
    )
  }

  get user$(): BehaviorSubject<User> {
    return this._user$;
  }
}