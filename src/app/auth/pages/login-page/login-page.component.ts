import { Component, OnDestroy, OnInit, WritableSignal, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseError } from 'firebase/app';
import { ApolloError } from 'apollo-server-errors';

import { ChromeMessage, MessageType } from '@chat-booth/core/models';
import { LayoutModule } from '@chat-booth/shared/layout';
import { AuthService } from '@chat-booth/auth/services';
import { AuthCredentials } from '@chat-booth/auth/models';

@Component({
  selector: 'login-page',
  standalone: true,
  imports: [
    LayoutModule,
  ],
  providers: [AuthService],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit, OnDestroy {
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

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

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
    this.inProgress.set(true);

    this.authService.authenticateUserByIdToken(credentials.idToken).subscribe({
      next: (): void => {
        this.router.navigate(['/home']);
      },
      error: (error: ApolloError): void => {
        this.loginFailed(error);
      }
    } 
  )}

  loginFailed(error: FirebaseError | ApolloError): void {
    this.inProgress.set(false);
  }

  loginSessionClosed(): void {
    this.inProgress.set(false);
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}