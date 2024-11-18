import { Injectable } from "@angular/core";
import { Apollo, MutationResult } from "apollo-angular";
import { Observable, map } from "rxjs";

import { AUTHENTICATE_USER } from "./gql-actions.gql";
import { AuthStatus } from "../models";

@Injectable()
export class AuthService {
  constructor(
    private readonly apollo: Apollo
  ) {}
  
  authenticateUserByIdToken(idToken: string): Observable<boolean> {
    return this.apollo.mutate<{ login: AuthStatus }>({
      mutation: AUTHENTICATE_USER,
      variables: { idToken }
    }).pipe(
      map((response: MutationResult<{ login: AuthStatus }>): boolean => {
        return response.data?.login.authorized;
      })
    );
  }
}

