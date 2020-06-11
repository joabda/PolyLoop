import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data/data.service';
import { Language } from 'src/app/enums/language';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

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
    }
  ];

  isBigScreen = true;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, public dialog: MatDialog, private data: DataService) { 
    this.data.language.subscribe( () => {
      this.updateText();
    });
  }

  ngOnInit() {
    this.breakpointObserver
      .observe(['(min-width: 935px)'])
      .subscribe((size: BreakpointState) => {
        this.isBigScreen = size.matches;
      }
      );
  }

  switchLanguage(): void {
    (document.getElementById("lang-img") as HTMLImageElement).src = `../../../assets/img/language/${this.data.language.value}.png`;
    this.data.language.next((this.data.language.value === Language.FR) ? Language.EN : Language.FR);
    this.updateText();
  }

  private updateText(): void {
    const titles = this.data.getTitles();
    for(let i = 0; i < this.links.length; ++i) {
      this.links[i].name = titles[i];
    }
  }
}
