import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BehaviorSubject } from "rxjs";

import { UserStateService } from "@chat-booth/core/services";
import { User } from "@chat-booth/core/models";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './app-navbar.component.html',
  styleUrl: './app-navbar.component.scss'
})
export class AppNavbarComponent {
  user$: BehaviorSubject<User> = inject(UserStateService).user$;


}