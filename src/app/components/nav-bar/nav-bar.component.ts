import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data/data.service';
import { Language } from 'src/app/enums/language';
import { link } from 'fs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, AfterViewInit {

  links = [
    {
      name   : '',
      href   : '/'
    },
    {
      name   : '',
      href   : '/hyperloop'
    },
    {
      name   : '',
      href   : '/team'
    },
    {
      name   : '',
      href   : '/sponsors'
    },
    {
      name   : '',
      href   : '/contact'
    },
    {
      name   : '',
      href   : ''
    }
  ];

  isBigScreen = true;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, public dialog: MatDialog, public data: DataService) { 
    this.data.language.subscribe( () => {
      this.updateText();
    });
  }

  ngOnInit(): void {
    this.breakpointObserver
      .observe(['(min-width: 935px)'])
      .subscribe((size: BreakpointState) => {
        this.isBigScreen = size.matches;
      }
      );
  }

  ngAfterViewInit(): void {
    this.changePage(0);
  }

  changePage(pageNumber: number): void {
    for(let i = 0; i < this.links.length; ++i) {
      const targetPage = document.getElementById(i.toString());
      if(targetPage !== null) {
        if(i === pageNumber) {
          targetPage.style.color = '#57BBBF';
          continue;
        }
        targetPage.style.color = 'black';
      }
    }
  }

  switchLanguage(toLang: string): void {
    this.data.language.next((toLang === 'FR') ? Language.FR : Language.EN);
    this.updateText();
    this.links[5].name = (toLang === 'FR') ? 'Français' : 'English';
  }

  private updateText(): void {
    const titles = this.data.getTitles();
    for(let i = 0; i < this.links.length; ++i) {
      this.links[i].name = titles[i];
    }
  }
}
