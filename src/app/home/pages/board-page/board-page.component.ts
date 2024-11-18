import { Component } from "@angular/core";

import { UserStateService } from "@chat-booth/core/services";
import { LayoutModule } from "@chat-booth/shared/layout";

@Component({
  selector: 'board-page',
  standalone: true,
  imports: [
    LayoutModule,
  ],
  templateUrl: './board-page.component.html',
  styleUrl: './board-page.component.scss'
})
export class BoardPageComponent {

  constructor(
    private readonly userStateService: UserStateService,
  ) {
    console.log(this.userStateService.user$.getValue())
  }

}