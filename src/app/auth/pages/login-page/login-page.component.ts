import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { Apollo } from "apollo-angular";

import { ChromeMessageType, ChromeMessage } from '@chat-booth/core/models';
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
  inProgress = signal(false);

  constructor(
    private readonly cd: ChangeDetectorRef
  ) {
    chrome.runtime.onMessage.addListener((message: ChromeMessage) => {
      if (message.type === ChromeMessageType.LoginSuccess) {
        this.loginSuccess(message);
      }

      if (message.type === ChromeMessageType.LoginFailed) {
        this.loginFailed(message);
      }

      if (message.type === ChromeMessageType.LoginSessionClosed) {
        this.loginSessionClosed();
      }
    });
  } 

  loginWithGoogle(): void {
    this.inProgress.set(true);

    chrome.runtime.sendMessage({ type: ChromeMessageType.GoogleLogin } as ChromeMessage);
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