import { Directive, HostListener, Output, EventEmitter } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

const DEBOUNCE_TIME: number = 50;
const MULTIPLY_WITH: number = 100;

@Directive({
  selector: '[scrollPercentage]',
  standalone: true
})
export class ScrollPercentageDirective {
  @HostListener('scroll', ['$event']) scroll(event: Event): void {
    const target = event.target as HTMLDivElement;
    const totalHeight = target.scrollHeight - target.clientHeight;
    const scrollPercentage = Math.trunc((target.scrollTop / totalHeight) * MULTIPLY_WITH);

    this.scroll$.next(scrollPercentage);
  };

  @Output() scrollPercentageChange = new EventEmitter<number>();

  scroll$: Subject<number> = new Subject<number>();
  
  constructor() {
    this.scroll$
      .pipe(debounceTime(DEBOUNCE_TIME)) 
      .subscribe((percentage: number) => 
        this.scrollPercentageChange.emit(percentage));
  }
}
