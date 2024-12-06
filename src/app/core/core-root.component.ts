import { Component, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LayoutModule } from '@chat-booth/shared/layout';

import { AppNavbarComponent } from './components';

@Component({
  selector: 'core-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LayoutModule,
    AppNavbarComponent
  ],
  template: `
    <root-layout>
      <layout-header header-primary>
        <app-navbar></app-navbar>
      </layout-header>
      
      <router-outlet />
    </root-layout>
  `,
})
export class CoreRootComponent {
  constructor( // Remove
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.document.body.classList.add("hyperion");
  }
}