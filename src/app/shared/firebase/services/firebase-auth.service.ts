import { Injectable, inject } from "@angular/core";
import { Auth, signInWithCustomToken } from "@angular/fire/auth";

import { GUserCredential } from "../models";

@Injectable()
export class FirebaseAuthService {
  auth = inject(Auth);
  
  public signInWithCustomToken(token: string): Promise<GUserCredential> {
    return signInWithCustomToken(this.auth, token);
  }
}