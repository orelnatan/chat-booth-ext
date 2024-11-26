import { Component, Input, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, RouterModule } from "@angular/router";

import { FirebaseTimestamp } from "@chat-booth/shared/firebase";

@Component({
  selector: 'booth-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './booth-header.component.html',
  styleUrl: './booth-header.component.scss'
})
export class BoothHeaderComponent {
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  @Input() id: string;
  @Input() joinedAt: FirebaseTimestamp;
}