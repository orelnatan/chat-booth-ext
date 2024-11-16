import { Component, WritableSignal, signal } from '@angular/core';
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
export class LoginPageComponent {
  inProgress: WritableSignal<boolean> = signal(false);

  constructor(
    private readonly authService: AuthService
  ) {
    chrome.runtime.onMessage.addListener((message: ChromeMessage) => {
      if (message.type === MessageType.LoginSuccess) {
        this.loginSuccess(<AuthCredentials>message.payload['credentials']);
      }

      if (message.type === MessageType.LoginFailed) {
        this.loginFailed(<FirebaseError>message.payload['error']);
      }

      if (message.type === MessageType.LoginSessionClosed) {
        this.loginSessionClosed();
      }
    });
  } 

  loginWithGoogle(): void {
    this.inProgress.set(true);

    chrome.runtime.sendMessage({ type: MessageType.GoogleLogin } as ChromeMessage);
  }

  loginSuccess(credentials: AuthCredentials): void {
    this.authService.authenticateUserByIdToken(credentials.idToken)
      .subscribe((authorized: boolean): void => {
        console.log("Success ", authorized, credentials);
    })
  }

  loginFailed(error: FirebaseError): void {
    console.log("Error ", error);
  }

  loginSessionClosed(): void {
    this.inProgress.set(false);
  }
}