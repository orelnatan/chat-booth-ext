import { NgModule } from "@angular/core";
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import * as FIREBASE_CONFIG from 'firebase.config.json'; 

@NgModule({
  imports: [
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFirestoreModule
  ]
})
export class FirebaseModule {}