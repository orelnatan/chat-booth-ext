import { Component, Input, booleanAttribute } from '@angular/core';

@Component({
  selector: 'page-layout',
  templateUrl: './page-layout.component.html',
  styleUrls: ['./page-layout.component.scss'],
})
export class PageLayoutComponent {  
  @Input({ transform: booleanAttribute }) fitWidthByContent: boolean;
  @Input({ transform: booleanAttribute }) fitHeightByContent: boolean;
  @Input({ transform: booleanAttribute }) withoutPadding: boolean;
}
