import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnDestroy, Output } from '@angular/core';

@Directive({
  selector: '[intersectionObserver]',
  standalone: true
})
export class IntersectionObserverDirective implements AfterViewInit, OnDestroy {
  @Input('intersectionObserver') intersectionElement: ElementRef<HTMLElement>;
  @Input() rootMargin: number;
  @Input() threshold: number;

  @Output() intersect: EventEmitter<void> = new EventEmitter<void>();

  private _observer: IntersectionObserver;

  constructor(
    private readonly scrollableContainer: ElementRef<HTMLDivElement>,
  ) {}

  ngAfterViewInit(): void {
    this._observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        if (entries[0].isIntersecting) {
          this.intersect.emit();
        }
      },
      {
        root: this.scrollableContainer.nativeElement, 
        rootMargin: `${this.rootMargin}%`, 
        threshold: this.threshold,
      }
    );
    // Initialize Intersection Observer
    this._observer.observe(this.intersectionElement.nativeElement);
  }

  ngOnDestroy(): void {
    // Clean up the Intersection Observer
    this._observer.disconnect();
  }
}