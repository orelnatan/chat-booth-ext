import { ElementRef } from "@angular/core";

export function scrollByPercentage(container: ElementRef<HTMLDivElement>, percentage: number): void {
  const element: HTMLDivElement = container.nativeElement;

  // Set the maximum scroll top.
  const maxScrollTop: number = element.scrollHeight - element.clientHeight;

  // Clamp the percentage between 0 and 100.
  const clampedPercentage: number = Math.max(0, Math.min(percentage, 100));

  // Smoothly scroll to the target position.
  element.scrollTo({
    top: (clampedPercentage / 100) * maxScrollTop,
    behavior: 'smooth', 
  });
}