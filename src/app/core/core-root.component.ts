import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { LayoutModule } from '@chat-booth/shared/layout';

import { ChromeUrlService } from './services';

@Component({
  selector: 'core-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LayoutModule,
  ],
  providers: [
    ChromeUrlService
  ],
  template: `
    <root-layout>
      <layout-header header-primary>
        <span>this url is: {{ url$ | async }}</span>
      </layout-header>
      
      <router-outlet />
    </root-layout>
  `,
})
export class CoreRootComponent {
  url$: BehaviorSubject<string> = inject(ChromeUrlService).url$;
}
