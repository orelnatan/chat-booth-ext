import { Component, OnInit } from "@angular/core";

import { BoothsService } from "@chat-booth/home/services";
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
export class BoardPageComponent implements OnInit {

  constructor(
    private readonly boothsService: BoothsService,
  ) {}
  
  ngOnInit(): void {
    
  }
}