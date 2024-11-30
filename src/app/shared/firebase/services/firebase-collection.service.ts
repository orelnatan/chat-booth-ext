import { Injectable } from "@angular/core";
import { DocumentChange, DocumentData, QuerySnapshot, Query, AngularFirestore, CollectionReference } from "@angular/fire/compat/firestore";
import { Observable, Subscriber } from "rxjs";

@Injectable()
export class FirebaseCollectionService {
  constructor(
    private readonly firestore: AngularFirestore,
  ) {}

  public getSubCollectionReference(collection: string, subCollection: string, path: string): CollectionReference<DocumentData> {
    return this.firestore
    .collection(collection)
    .doc(path)
    .collection(subCollection)
    .ref
  }

  public observeRemoteCollectionStream(reference: CollectionReference<DocumentData> | Query<DocumentData>): Observable<DocumentChange<DocumentData>> {
    return new Observable((observer: Subscriber<DocumentChange<DocumentData>>) => {
      reference.onSnapshot((snapshot: QuerySnapshot<DocumentData>): void => {
        snapshot.docChanges().forEach((change: DocumentChange<DocumentData>): void => {
          observer.next(change);
        });
      });
    });
  }
}