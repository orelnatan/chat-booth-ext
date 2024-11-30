import { Injectable } from "@angular/core";
import { Apollo, MutationResult } from "apollo-angular";
import { Observable, map } from "rxjs";

import { AUTHENTICATE } from "./gql-actions.gql";
import { AuthData } from "../models";

@Injectable()
export class AuthService {
  constructor(
    private readonly apollo: Apollo
  ) {}
  
  public authenticateUserByIdToken(idToken: string): Observable<string> {
    return this.apollo.mutate<{ authenticate: AuthData }>({
      mutation: AUTHENTICATE,
      variables: { idToken }
    }).pipe(
      map((response: MutationResult<{ authenticate: AuthData }>): string => {
        if(!response.data.authenticate.customToken) throw new Error(
          'Apollo GraphQL error occurred, at AUTHENTICATE ❌');

        return response.data.authenticate.customToken;
      })
    );
  }
}

