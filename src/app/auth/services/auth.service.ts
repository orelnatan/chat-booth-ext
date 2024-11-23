import { Injectable } from "@angular/core";
import { Apollo, MutationResult } from "apollo-angular";
import { Observable, map } from "rxjs";

import { AUTHENTICATE } from "./gql-actions.gql";
import { AuthStatus } from "../models";

@Injectable()
export class AuthService {
  constructor(
    private readonly apollo: Apollo
  ) {}
  
  public authenticateUserByIdToken(idToken: string): Observable<boolean> {
    return this.apollo.mutate<{ authenticate: AuthStatus }>({
      mutation: AUTHENTICATE,
      variables: { idToken }
    }).pipe(
      map((response: MutationResult<{ authenticate: AuthStatus }>): boolean => {
        if(!response.data.authenticate.authorized) throw new Error(
          'Apollo GraphQL error occurred, at AUTHENTICATE ❌');

        return response.data.authenticate.authorized;
      })
    );
  }
}

