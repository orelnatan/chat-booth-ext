import { NgModule } from '@angular/core';

import { 
  RootLayoutComponent,
  PageLayoutComponent, 
  LayoutHeaderComponent,
  LayoutSidebarComponent,
  LayoutFooterComponent,
} from './components';

@NgModule({
  declarations: [
    RootLayoutComponent,
    PageLayoutComponent, 
    LayoutHeaderComponent,
    LayoutSidebarComponent,
    LayoutFooterComponent,
  ],
  exports: [
    RootLayoutComponent,
    PageLayoutComponent, 
    LayoutHeaderComponent,
    LayoutSidebarComponent,
    LayoutFooterComponent
  ]
})
export class LayoutModule {}