import { Component, ElementRef, OnInit, ViewChild, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { DocumentChange, DocumentData, Query } from "@angular/fire/compat/firestore";
import { OrderByDirection, WhereFilterOp } from "firebase/firestore";  
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ApolloError } from "apollo-server-errors";
import { Observable, finalize } from "rxjs";

import { Collection, SubCollection } from "@chat-booth/core/models";
import { 
  FireDocumentChangeType,
  FirebaseCollectionService as CollectionService,
  FirebaseModule,
  FirebaseTimestamp, 
  stringToFirebaseTimestamp 
} from "@chat-booth/shared/firebase";
import { LayoutModule } from "@chat-booth/shared/layout";
import { pushToBottom, scrollByPercentage } from "@chat-booth/shared/utils";
import { IntersectionObserverDirective } from "@chat-booth/shared/directives";
import { BoothsService } from "@chat-booth/home/services";
import { Booth, ChatMessage } from "@chat-booth/home/models";
import { fireDocumentToChatMessage } from "@chat-booth/home/utils";

import { BoothChatComponent, BoothFooterComponent, BoothHeaderComponent } from "./components";

const PATH_PARAM: string = "boothId";
const CREATED_AT: string = "createdAt";
const PARENT_MESSAGE_ID: string = "parentMessageId";
const DESCENDING: OrderByDirection = "desc"; 
const GREATER_THAN: WhereFilterOp = ">"; 
const EQUALS_TO: WhereFilterOp = "==";
const LIMIT: number = 20;

@UntilDestroy()
@Component({
  selector: 'booth-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LayoutModule,
    FirebaseModule,
    BoothHeaderComponent,
    BoothChatComponent,
    BoothFooterComponent,
    IntersectionObserverDirective
  ],
  templateUrl: './booth-page.component.html',
  styleUrl: './booth-page.component.scss'
})
export class BoothPageComponent implements OnInit {
  @ViewChild('boothChatContainer', { read: ElementRef, static: true }) chatContainer: ElementRef<HTMLDivElement>;
  @ViewChild('boothScrollMarker', { read: ElementRef, static: true }) scrollMarker: ElementRef<HTMLSpanElement>;

  collectionService: CollectionService = inject(CollectionService);
  boothsService: BoothsService = inject(BoothsService);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  
  booth$: Observable<Booth> = this.boothsService.getBoothById(this.boothId);
  
  messages: ChatMessage[];
  sending: boolean;
  loading: boolean;
  cursor: string;

  ngOnInit(): void {
    this.boothsService.getMessages(this.boothId, LIMIT)
    .pipe(untilDestroyed(this))
    .subscribe((messages: ChatMessage[]) => {
        this.messages = messages;
        this.cursor = messages[0].createdAt;

        this.observeBoothMessagesStream(
          stringToFirebaseTimestamp([ ...messages ].pop()?.createdAt));
      }
    )
  }

  chatViewInit(): void {
    scrollByPercentage(this.chatContainer, 100);
  }

  loadMoreMessages(cursor: string): void { 
    this.loading = true;
    
    this.boothsService.getMessages(this.boothId, LIMIT, cursor)
    .pipe(
      untilDestroyed(this),
      finalize(() => {
        this.loading = false;

        pushToBottom(this.chatContainer, 2);
      })
    )
    .subscribe((messages: ChatMessage[]) => {      
        this.cursor = messages[0]?.createdAt || null;
        
        this.messages = [ ...messages, ...this.messages ];  
      }
    )
  }

  observeBoothMessagesStream(latestTimestamp: FirebaseTimestamp): void {
    this.collectionService
    .observeRemoteCollectionStream(
      this.getBoothMessagesCollectionReference(latestTimestamp))
    .pipe(untilDestroyed(this))
    .subscribe((change: DocumentChange<DocumentData>) => {
      if(change.type === FireDocumentChangeType.Added) {
        this.addMessage(fireDocumentToChatMessage(change.doc.data()));
      }
    })
  }
  
  getBoothMessagesCollectionReference(startAfterTimestamp: FirebaseTimestamp): Query<DocumentData> {
    return this.collectionService
    .getSubCollectionReference(Collection.Booths, SubCollection.BoothMessages, this.boothId)
    .orderBy(CREATED_AT, DESCENDING)
    .where(PARENT_MESSAGE_ID, EQUALS_TO, null)
    .where(CREATED_AT, GREATER_THAN, startAfterTimestamp || FirebaseTimestamp.now());
  }

  sendMessage(message: ChatMessage): void {
    this.sending = true;

    this.boothsService.sendMessage(this.boothId, message.content)
    .pipe(untilDestroyed(this))
    .subscribe({
      next: (message: ChatMessage) => {
        this.sending = false;

        scrollByPercentage(this.chatContainer, 100);
      },
      error: (error: ApolloError) => {
        this.sending = false;

        console.error(error);
      }
    });
  }

  addMessage(message: ChatMessage): void {   
    this.messages.push(message);
  }

  handleMessage(content: string): void {
    this.sendMessage({ content } as ChatMessage);
  }

  handleIntersect(): void {
    if(this.loading || !this.cursor) return;

    this.loadMoreMessages(this.cursor);
  }

  get boothId(): string {
    return this.activatedRoute.snapshot.paramMap.get(PATH_PARAM);
  }
}
