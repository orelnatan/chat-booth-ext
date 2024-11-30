import { Component, OnDestroy, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseError } from 'firebase/app';
import { ApolloError } from 'apollo-server-errors';

import { ChromeLocalStorageService } from '@chat-booth/core/services';
import { ChromeMessage, MessageType } from '@chat-booth/core/models';
import { FirebaseAuthService, FirebaseModule } from '@chat-booth/shared/firebase';
import { LayoutModule } from '@chat-booth/shared/layout';
import { AuthService } from '@chat-booth/auth/services';
import { AuthCredentials } from '@chat-booth/auth/models';

@Component({
  selector: 'login-page',
  standalone: true,
  imports: [
    LayoutModule,
    FirebaseModule
  ],
  providers: [AuthService],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit, OnDestroy {
  chromeLocalStorageService: ChromeLocalStorageService = inject(ChromeLocalStorageService);
  firebaseAuthService: FirebaseAuthService = inject(FirebaseAuthService);
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);

  inProgress: WritableSignal<boolean> = signal(false);

  chromeRuntimeListener = (message: ChromeMessage): void => {
    if (message.type === MessageType.LoginSuccess) {
      this.loginSuccess(<AuthCredentials>message.payload);
    }

    if (message.type === MessageType.LoginFailed) {
      this.loginFailed(<FirebaseError>message.payload);
    }

    if (message.type === MessageType.LoginSessionClosed) {
      this.loginSessionClosed();
    }
  };

  ngOnInit(): void {
    chrome.runtime.onMessage.addListener(this.chromeRuntimeListener);
  }

  ngOnDestroy(): void {
    chrome.runtime.onMessage.removeListener(this.chromeRuntimeListener);
  }

  loginWithGoogle(): void {
    this.inProgress.set(true);

    chrome.runtime.sendMessage({ type: MessageType.GoogleLoginInit } as ChromeMessage);
  }

  loginSuccess(credentials: AuthCredentials): void {
    this.authService.authenticateUserByIdToken(credentials.idToken).subscribe({
      next: async(customToken: string) => {
        const uid: string = credentials.uid;
        const idToken: string = await (await this.firebaseAuthService
          .signInWithCustomToken(customToken))
          .user
          .getIdToken();

        this.chromeLocalStorageService.set<AuthCredentials>({ idToken, uid });
        this.router.navigate(['/home']);
      },
      error: (error: ApolloError): void => {
        this.inProgress.set(false);

        this.loginFailed(error);
      }
    } 
  )}

  loginFailed(error: FirebaseError | ApolloError): void {
    console.error(error);
  }

  loginSessionClosed(): void {
    this.inProgress.set(false);
  }
}