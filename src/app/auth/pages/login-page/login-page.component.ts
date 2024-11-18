import { Component, OnDestroy, OnInit, WritableSignal, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseError } from 'firebase/app';
import { ApolloError } from 'apollo-server-errors';

import { UserStateService } from '@chat-booth/core/services';
import { ChromeMessage, MessageType, User } from '@chat-booth/core/models';
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
    private readonly userStateService: UserStateService,
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
    this.authService.authenticateUserByIdToken(credentials.idToken).subscribe({
      next: (): void => {
        this.userStateService.fetchUserByCredentials(credentials).subscribe({
          next: () => {
            this.router.navigate(['/home']);
          },
          error: (error: ApolloError) => {
            this.loginFailed(error);
          }
        })
      },
      error: (error: ApolloError): void => {
        this.loginFailed(error);
      },
    } 
  )}

  loginFailed(error: FirebaseError | ApolloError): void {
    console.error("Error ", error);
  }

  loginSessionClosed(): void {
    this.inProgress.set(false);
  }
}