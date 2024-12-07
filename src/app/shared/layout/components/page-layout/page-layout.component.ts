import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'page-layout',
  templateUrl: './page-layout.component.html',
  styleUrls: ['./page-layout.component.scss'],
})
export class PageLayoutComponent {
  @ViewChild('pageLayoutBody', { read: ElementRef }) pageLayoutBody: ElementRef<HTMLDivElement>;
  
  @Output() scrollTopReached: EventEmitter<Event> = new EventEmitter();
  @Output() scrollBottomReached: EventEmitter<Event> = new EventEmitter();

  public scrollToTop(): void {
    this.pageLayoutBody.nativeElement.scrollTop = 0;
  }

  public scrollToBottom(): void {
    this.pageLayoutBody.nativeElement.scrollTop = this.pageLayoutBody.nativeElement.scrollHeight;
  }

  public onScroll(event: Event): void {
    const target = event.target as HTMLDivElement;

    if (target.scrollTop === 0) {
      this.scrollTopReached.emit(event);
    }

    if (target.scrollTop + target.clientHeight >= target.scrollHeight) {
      this.scrollBottomReached.emit(event);
    }
  }
}
