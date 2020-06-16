import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent {

  private mainNav;
  constructor() { }

  ngAfterViewInit(): void {
    this.mainNav = document.getElementById('main-nav');
    if (this.mainNav !== null) {
      this.mainNav.style.backgroundColor = 'transparent';
    }
  }

  ngOnDestroy(): void {
    if (this.mainNav !== null) {
      this.mainNav.style.backgroundColor = '#FFFFFF';
    }
  }

  @HostListener('window:scroll', ['$event'])
  scrollHandler(event: Event) {
    const missionSection = document.getElementById('mission');
    if (missionSection !== null) {
      if (missionSection.getBoundingClientRect().top < 200) {
        this.mainNav.style.backgroundColor = '#FFFFFF';
      } else {
        this.mainNav.style.backgroundColor = 'transparent';
      }
    }
  }
}
