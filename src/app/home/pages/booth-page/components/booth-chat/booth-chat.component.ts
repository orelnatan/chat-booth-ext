import { AfterViewInit, Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ChatMessage } from "@chat-booth/home/models";

import { ChatMessageComponent } from "./components";

@Component({
  selector: 'booth-chat',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessageComponent
  ],
  templateUrl: './booth-chat.component.html',
  styleUrl: './booth-chat.component.scss'
})
export class BoothChatComponent implements AfterViewInit {
  @Input() messages: ChatMessage[] = [];

  @Output() afterViewInit: EventEmitter<void> = new EventEmitter();

  ngAfterViewInit(): void {
    this.afterViewInit.emit();
  }
}