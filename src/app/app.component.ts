import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<div>App Root</div>'
})
export class AppComponent {
  title = 'chat-booth-ext V3';


  
}
