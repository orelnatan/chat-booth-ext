import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterModule } from "@angular/router";
import { Observable } from "rxjs";

import { BoothsService } from "@chat-booth/home/services";
import { Booth } from "@chat-booth/home/models";
import { LayoutModule } from "@chat-booth/shared/layout";

@Component({
  selector: 'board-page',
  standalone: true,
  imports: [
    CommonModule,
    LayoutModule,
    RouterModule
  ],
  templateUrl: './board-page.component.html',
  styleUrl: './board-page.component.scss'
})
export class BoardPageComponent {
  router: Router = inject(Router);
  boothsService: BoothsService = inject(BoothsService);

  booths$: Observable<Booth[]> = this.boothsService.getBooths();
}