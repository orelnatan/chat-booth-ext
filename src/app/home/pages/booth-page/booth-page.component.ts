import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { CollectionReference, DocumentChange, DocumentData } from "@angular/fire/compat/firestore";
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from "rxjs";

import { FireDocumentChangeType, FirebaseCollectionService, FirebaseModule } from "@chat-booth/shared/firebase";
import { LayoutModule } from "@chat-booth/shared/layout";
import { BoothsService } from "@chat-booth/home/services";
import { Booth, ChatMessage } from "@chat-booth/home/models";

import { BoothFooterComponent, BoothHeaderComponent } from "./components";

const PATH_PARAM: string = "boothId";

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
    BoothFooterComponent,
  ],
  templateUrl: './booth-page.component.html',
  styleUrl: './booth-page.component.scss'
})
export class BoothPageComponent implements OnInit {
  firebaseCollectionService: FirebaseCollectionService = inject(FirebaseCollectionService);
  boothsService: BoothsService = inject(BoothsService);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  
  booth$: Observable<Booth> = this.boothsService.getBoothById(this.boothId);
  messages$: Observable<ChatMessage[]> = this.boothsService.getMessages(this.boothId);

  ngOnInit(): void {
    const reference: CollectionReference<DocumentData> = this.firebaseCollectionService
    .getSubCollectionReference("booths", "boothMessages", this.boothId);
    
   this.firebaseCollectionService
    .observeRemoteCollectionStream(reference)
    .pipe(untilDestroyed(this))
    .subscribe((change: DocumentChange<DocumentData>) => {
      if(change.type === FireDocumentChangeType.Added) {
        console.log("FireDocumentChangeType.Added data", change.doc.data());
      }
    })
  }

  get boothId(): string {
    return this.activatedRoute.snapshot.paramMap.get(PATH_PARAM);
  }
}
