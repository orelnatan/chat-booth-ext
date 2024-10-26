import { Component } from '@angular/core';

import { GoogleAuthService } from '@chat-booth/auth/services';
import { LayoutModule } from '@chat-booth/shared/layout';
import { GUser, GUserCredential } from '@chat-booth/shared/firebase';

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
  user: GUser | null = null;

  constructor(private readonly googleAuthService: GoogleAuthService) {
    this.googleAuthService.getCurrentUser().subscribe(user => {
      this.user = user;

      console.log(this.user)
    });
  } 

  login() {
    this.googleAuthService.login().then((user: GUserCredential) => {
      console.log(user)
    });
  }

  logout() {
    this.googleAuthService.logout().then(() => {
      console.log("Logged Out")
    });
  }
}