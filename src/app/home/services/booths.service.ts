import { Injectable } from "@angular/core";
import { Apollo, MutationResult } from "apollo-angular";
import { Observable, map, of } from "rxjs";

import { GET_BOOTHS, JOIN_BOOTH, LEAVE_BOOTH, GET_MESSAGES, SEND_MESSAGE } from "./gql-actions.gql";
import { Booth, ChatMessage } from "../models";

const LIMIT: number = 3;
const CURSOR: number = 3;

@Injectable()
export class BoothsService {
  constructor(
    private readonly apollo: Apollo,
  ) {}
  
  public getBooths(): Observable<Booth[]> {
    return this.apollo.query<{ userBooths: Booth[] }>({
      query: GET_BOOTHS,
    }).pipe(
      map((response: MutationResult<{ userBooths: Booth[] }>): Booth[] => {
        if(!response.data.userBooths) throw new Error(
          'Apollo GraphQL error occurred, at GET_BOOTHS ❌');

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

  public getMessages(boothId: string): Observable<ChatMessage[]> {
    return this.apollo.query<{ messages: ChatMessage[] }>({
      query: GET_MESSAGES,
      variables: {
        boothId,
        limit: LIMIT,
       // cursor: CURSOR
      }
    }).pipe(
      map((response: MutationResult<{ messages: ChatMessage[] }>): ChatMessage[] => {
        if(!response.data.messages) throw new Error(
          'Apollo GraphQL error occurred, at GET_MESSAGES ❌');

        return response.data.messages;
      })
    );
  }

  public sendMessage(boothId: string, content: string): Observable<ChatMessage> {
    return this.apollo.mutate<{ sendMessage: ChatMessage }>({
      mutation: SEND_MESSAGE,
      variables: {
        boothId,
        content
      }
    }).pipe(
      map((response: MutationResult<{ sendMessage: ChatMessage }>): ChatMessage => {
        if(!response.data.sendMessage) throw new Error(
          'Apollo GraphQL error occurred, at SEND_MESSAGE ❌');

        return response.data.sendMessage;
      })
    );
  }

  public getBoothById(id: string): Observable<Booth> {
    return this.getBooths().pipe(
      map((booths: Booth[]) => {
        return booths.find(booth => 
          booth.id === id)
      })
    )
  }
}

