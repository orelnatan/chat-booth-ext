import { Component, OnDestroy, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseError } from 'firebase/app';
import { ApolloError } from 'apollo-server-errors';

import { ChromeLocalStorageService as StorageService } from '@chat-booth/core/services';
import { ChromeMessage, ChromeMessageType } from '@chat-booth/core/models';
import { FirebaseAuthService as FireAuthService, FirebaseModule } from '@chat-booth/shared/firebase';
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
  storageService: StorageService = inject(StorageService);
  fireAuthService: FireAuthService = inject(FireAuthService);
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);

  inProgress: WritableSignal<boolean> = signal(false);

  chromeRuntimeListener = (message: ChromeMessage): void => {
    if (message.type === ChromeMessageType.LoginSuccess) {
      this.loginSuccess(<AuthCredentials>message.payload);
    }

    if (message.type === ChromeMessageType.LoginFailed) {
      this.loginFailed(<FirebaseError>message.payload);
    }

    if (message.type === ChromeMessageType.LoginSessionClosed) {
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

    chrome.runtime.sendMessage({ type: ChromeMessageType.GoogleLoginInit } as ChromeMessage);
  }

  loginSuccess(credentials: AuthCredentials): void {
    this.authService.authenticateUserByIdToken(credentials.idToken).subscribe({
      next: async(customToken: string) => {
        const uid: string = credentials.uid;
        const idToken: string = await (await this.fireAuthService
          .signInWithCustomToken(customToken))
          .user
          .getIdToken();

        this.storageService.set<AuthCredentials>({ idToken, uid });
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