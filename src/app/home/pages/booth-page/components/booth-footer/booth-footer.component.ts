import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'booth-footer',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './booth-footer.component.html',
  styleUrl: './booth-footer.component.scss'
})
export class BoothFooterComponent {
  @Input() pending: boolean;

  @Output() message: EventEmitter<string> = new EventEmitter();

  value: string;

  sendMessage(): void {
    this.message.emit(this.value);

    this.value = null;
  }
}