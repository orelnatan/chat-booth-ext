import { Component, OnDestroy, OnInit, WritableSignal, signal } from '@angular/core';
import { FirebaseError } from 'firebase/app';

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

  chromeRuntimeListener = (message: ChromeMessage) => {
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
    console.log("Success ", credentials);
  }

  loginFailed(error: FirebaseError): void {
    console.log("Error ", error);
  }

  loginSessionClosed(): void {
    this.inProgress.set(false);
  }
}