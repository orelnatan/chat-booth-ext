import { TestBed } from '@angular/core/testing';
import { AppRootComponent } from './app-root.component';

describe('AppRootComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppRootComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppRootComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppRootComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, chat-booth-ext');
  });
});
