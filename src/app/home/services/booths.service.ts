import { Injectable } from "@angular/core";
import { Apollo, MutationResult } from "apollo-angular";
import { Observable, map } from "rxjs";

import { USER_BOOTHS, JOIN_BOOTH, LEAVE_BOOTH } from "./gql-actions.gql";
import { Booth } from "../models";

@Injectable()
export class BoothsService {
  constructor(
    private readonly apollo: Apollo,
  ) {}
  
  public getUserBooths(): Observable<Booth[]> {
    return this.apollo.query<{ userBooths: Booth[] }>({
      query: USER_BOOTHS,
      fetchPolicy: 'no-cache'
    }).pipe(
      map((response: MutationResult<{ userBooths: Booth[] }>): Booth[] => {
        if(!response.data.userBooths) throw new Error(
          'Apollo GraphQL error occurred, at USER_BOOTHS ❌');

        return response.data.userBooths;
      })
    );
  }

  public joinBooth(url: string): Observable<Booth> {
    return this.apollo.mutate<{ joinBooth: Booth }>({
      mutation: JOIN_BOOTH,
      fetchPolicy: 'no-cache',
      variables: {
        url
      },
    }).pipe(
      map((response: MutationResult<{ joinBooth: Booth }>): Booth => {
        if(!response.data.joinBooth) throw new Error(
          'Apollo GraphQL error occurred, at JOIN_BOOTH ❌');

        return response.data.joinBooth;
      })
    );
  }

  public leaveBooth(boothId: string): Observable<boolean> {
    return this.apollo.mutate<{ leaveBooth: boolean }>({
      mutation: LEAVE_BOOTH,
      variables: {
        boothId
      },
    }).pipe(
      map((response: MutationResult<{ leaveBooth: boolean }>): boolean => {
        if(!response.data.leaveBooth) throw new Error(
          'Apollo GraphQL error occurred, at LEAVE_BOOTH ❌');

        return response.data.leaveBooth;
      })
    );
  }
}

