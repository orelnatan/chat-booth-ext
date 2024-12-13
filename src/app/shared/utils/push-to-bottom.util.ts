import { ElementRef } from "@angular/core";

export function pushToBottom(container: ElementRef<HTMLDivElement>, heightPercentage: number): void {
  container.nativeElement.scrollTop = (container.nativeElement.scrollHeight / heightPercentage);
}