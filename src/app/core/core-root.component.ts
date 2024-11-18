import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LayoutModule } from '@chat-booth/shared/layout';

@Component({
  selector: 'core-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LayoutModule,
  ],
  template: `
    <root-layout>
      <layout-header header-primary>
        <span>this url is:</span>
      </layout-header>
      
      <router-outlet />
    </root-layout>
  `,
})
export class CoreRootComponent {}