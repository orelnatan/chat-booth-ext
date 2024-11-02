import { NgModule } from '@angular/core';

import { 
  RootLayoutComponent,
  PageLayoutComponent, 
  LayoutHeaderComponent,
  LayoutSidebarComponent,
  LayoutFooterComponent,
} from './components';

import { LayoutService } from './services';

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
  ],
  providers: [LayoutService]
})
export class LayoutModule {}