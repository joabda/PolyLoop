import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'POLYLOOP';

  @HostListener('window:scroll', ['$event'])
  scrollHandler(event) {
    const about = document.getElementById('mission').getBoundingClientRect();
    const mainNav = document.getElementById('main-nav');
    if(about.top < 200) {
      mainNav.style.backgroundColor = '#323232';
      mainNav.style.opacity = '0.75';
    } else {
      mainNav.style.backgroundColor = 'transparent';
    }
  }
}
