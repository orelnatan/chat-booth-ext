import { Component } from '@angular/core';

import { LayoutModule } from './shared/layout';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LayoutModule],
  template: `
    <root-layout forRoot>
      Content
    </root-layout>
  `
})
export class AppRootComponent {}
