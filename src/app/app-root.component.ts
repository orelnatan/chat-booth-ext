import { Component, OnInit } from '@angular/core';

import { LayoutModule } from './shared/layout';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    LayoutModule,
  ],
  template: `
    <root-layout forRoot>
      <router-outlet></router-outlet>
    </root-layout>
  `
})
export class AppRootComponent implements OnInit {
  ngOnInit(): void {
    chrome.runtime.connect();
  }
}
