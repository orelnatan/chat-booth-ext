import { NgModule } from "@angular/core";
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { FirebaseAuthService, FirebaseCollectionService } from "./services";

import * as FIREBASE_CONFIG from 'firebase.config.json'; 

@NgModule({
  imports: [
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [
    FirebaseAuthService,
    FirebaseCollectionService
  ]
})
export class FirebaseModule {}