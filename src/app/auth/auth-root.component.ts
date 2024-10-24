import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LayoutModule } from '@chat-booth/shared/layout';

@Component({
  selector: 'auth-root',
  standalone: true,
  imports: [
    RouterModule,
    LayoutModule,
  ],
  template: `
    <root-layout>
      <router-outlet />
    </root-layout>
  `,
})
export class AuthRootComponent {}
