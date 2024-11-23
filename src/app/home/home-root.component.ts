import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LayoutModule } from '@chat-booth/shared/layout';

import { BoothsService } from './services';

@Component({
  selector: 'home-root',
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
  providers: [
    BoothsService
  ]
})
export class HomeRootComponent {}
