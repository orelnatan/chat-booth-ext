import { Component, WritableSignal, signal } from '@angular/core';
import { Apollo } from "apollo-angular";

import { ChromeMessage, MessageType } from '@chat-booth/core/models';
import { LayoutModule } from '@chat-booth/shared/layout';

@Component({
  selector: 'login-page',
  standalone: true,
  imports: [
    LayoutModule,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  inProgress: WritableSignal<boolean> = signal(false);

  constructor(
    private readonly apollo: Apollo
  ) {
    chrome.runtime.onMessage.addListener((message: ChromeMessage) => {
      if (message.type === MessageType.LoginSuccess) {
        this.loginSuccess(message);
      }

      if (message.type === MessageType.LoginFailed) {
        this.loginFailed(message);
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

  loginSuccess(message: ChromeMessage): void {
    console.log("Success", message);
  }

  loginFailed(message: ChromeMessage): void {
    console.log("Failed", message);
  }

  loginSessionClosed(): void {
    this.inProgress.set(false);
  }
}