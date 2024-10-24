import { Component, Input, booleanAttribute } from '@angular/core';

@Component({
  selector: 'root-layout',
  templateUrl: './root-layout.component.html',
  styleUrls: ['./root-layout.component.scss'],
})
export class RootLayoutComponent {
  @Input({ transform: booleanAttribute }) forRoot: boolean;
}
