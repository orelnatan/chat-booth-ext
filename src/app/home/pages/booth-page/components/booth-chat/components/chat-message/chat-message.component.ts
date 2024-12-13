import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ChatMessage } from "@chat-booth/home/models";

@Component({
  selector: 'chat-message',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.scss'
})
export class ChatMessageComponent {
  @Input() message: ChatMessage;
}