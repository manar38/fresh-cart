import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'E-Commerce';
  scrollToTop():void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
