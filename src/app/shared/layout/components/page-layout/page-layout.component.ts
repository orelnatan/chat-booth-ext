import { Component, Input } from '@angular/core';

@Component({
  selector: 'page-layout',
  templateUrl: './page-layout.component.html',
  styleUrls: ['./page-layout.component.scss'],
})
export class PageLayoutComponent {  
  @Input() fitWidthByContent: boolean;
  @Input() fitHeightByContent: boolean;

  @Input() withoutPadding: boolean;
}
