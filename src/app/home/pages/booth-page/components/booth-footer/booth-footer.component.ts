import { Component, EventEmitter, Output } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'booth-footer',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './booth-footer.component.html',
  styleUrl: './booth-footer.component.scss'
})
export class BoothFooterComponent {
  @Output() onMessage: EventEmitter<string> = new EventEmitter();

}