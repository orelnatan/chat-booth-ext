import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { Observable } from "rxjs";

import { LayoutModule } from "@chat-booth/shared/layout";
import { BoothsService } from "@chat-booth/home/services";
import { Booth, ChatMessage } from "@chat-booth/home/models";

import { BoothFooterComponent, BoothHeaderComponent } from "./components";

const PATH_PARAM: string = "boothId";

@Component({
  selector: 'booth-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LayoutModule,
    BoothHeaderComponent,
    BoothFooterComponent
  ],
  templateUrl: './booth-page.component.html',
  styleUrl: './booth-page.component.scss'
})
export class BoothPageComponent {
  boothsService: BoothsService = inject(BoothsService);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  
  booth$: Observable<Booth> = this.boothsService.getBoothById(this.boothId);
  messages$: Observable<ChatMessage[]> = this.boothsService.getMessages(this.boothId);
  
  get boothId(): string {
    return this.activatedRoute.snapshot.paramMap.get(PATH_PARAM);
  }
}
