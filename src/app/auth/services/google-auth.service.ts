import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Observable } from 'rxjs';

import { GoogleAuthProvider, GUser, GUserCredential } from "@chat-booth/shared/firebase";

@Injectable()
export class GoogleAuthService {
  constructor(
    private readonly angularFireAuth: AngularFireAuth
  ) {}
  
  getCurrentUser(): Observable<GUser | null>{
    return this.angularFireAuth.authState;
  }

  login(): Promise<GUserCredential> {
    return this.angularFireAuth.signInWithPopup(new GoogleAuthProvider());
  }

  logout(): Promise<void> {
    return this.angularFireAuth.signOut();
  }
}