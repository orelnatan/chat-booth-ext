import { Injectable, inject } from "@angular/core";
import { DocumentChange, DocumentData, QuerySnapshot, Query, AngularFirestore, CollectionReference } from "@angular/fire/compat/firestore";
import { Observable, Subscriber } from "rxjs";

@Injectable()
export class FirebaseCollectionService {
  angularFirestore: AngularFirestore = inject(AngularFirestore);

  // Get direct reference into a remote sub-collection in Google Firestore DB. 
  public getSubCollectionReference(collection: string, subCollection: string, path: string): CollectionReference<DocumentData> {
    return this.angularFirestore
    .collection(collection)
    .doc(path)
    .collection(subCollection)
    .ref
  }

  // Intercept changes in Google Firestore remote collection stream.
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