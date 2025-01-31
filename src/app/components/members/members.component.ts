import { Component, ViewChild, OnDestroy } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { FormControl } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { HotkeysService } from 'src/app/services/hotkeys/hotkeys.service';
import { TeamJSON } from 'src/app/interfaces/json/teamJSON';
import { Language } from 'src/app/enums/language';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnDestroy {

  private subscriptions: Subscription[] = [];
  // titleControl: FormControl = new FormControl()
  // searchedMembers: Member[] = this.members;
  // allNames: string[];
  // title: string;
  // filteredMembers: Observable<string[]>;
  // @ViewChild(MatInput) private filter: MatInput;
  teams: TeamJSON[];

  constructor(
    public data: DataService,
    private shortcut: HotkeysService) {
      data.language.subscribe( () => this.teams = data.getMembers() );
      this.teams.forEach( el => {
        el.members.forEach( el1 => console.log(el1.linkedIn))
      })
      // this.allNames = this.getAllNames()

      // this.filteredMembers = this.titleControl.valueChanges
      // .pipe(
      //   startWith(""),
      //   map((state) => state ? this._filterStates(state) : this.allNames.slice())
      // );

      // this.subscriptions.push(this.shortcut.addShortcut({ keys: "control.f", description: "Search" }).subscribe((event) => {
      //   this.filter.focus();
      // }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(
      subscribed => {
        subscribed.unsubscribe();
        this.subscriptions.pop();
    });
  }

  getTitle(): string {
    return this.data.language.value === Language.FR ? "Notre incroyable équipe" : "Our amazing team"
  }

  // searchMember(): void {
  //   if (!this.titleControl.value || this.titleControl.value.length === 0) {
  //     this.searchedMembers = this.members;
  //     this.titleControl.setValue("");
  //     this.title = "";
  //     return;
  //   }

  //   const searchallNames: string[] = this.allNames.filter((element) => this.filterallNames(element));
  //   this.searchedMembers = new Array();
  //   for (const title of searchallNames) {
  //     this.searchedMembers.push(this.members.find((movie) => movie.firstName === title || movie.lastName === title) as Member);
  //   }
  // }

  // private filterallNames(element: string): boolean {
  //   return element.toLowerCase().startsWith(this.title);
  // }

  // private getAllNames(): string[] {
  //   let ret: string[] = [];
  //   for (const member of this.members) {
  //     ret.push(member.firstName);
  //     ret.push(member.lastName);
  //   }
  //   return ret;
  // }

  // private _filterStates(value: string): string[] {
  //   const filterValue: string = value.toLowerCase();
  //   this.title = filterValue;
  //   return this.allNames.filter((title) => title.toLowerCase().indexOf(filterValue) === 0);
  // }
}
