import { Injectable } from "@angular/core";
import { Apollo, MutationResult, gql } from "apollo-angular";
import { Observable, map } from "rxjs";
import { AuthStatus } from "../models/auth-status.interface";

const AUTHENTICATE_USER = gql`
  mutation login($idToken: String!) {
    login(idToken: $idToken) {
      authorized
    }
  }
`;

@Injectable()
export class AuthService {
  constructor(
    private readonly apollo: Apollo
  ) {}
  
  authenticateUserByIdToken(idToken: string): Observable<boolean> {
    return this.apollo.mutate<AuthStatus>({
      mutation: AUTHENTICATE_USER,
      variables: { idToken }
    }).pipe(
      map((authStatus: MutationResult<AuthStatus>): boolean => {
        return authStatus.data.authorized;
      })
    )
  }
}