import { Component, ViewChild, OnDestroy } from '@angular/core';
import * as _members from '../../../assets/data/members.json';
import { Member } from 'src/app/interfaces/member';
import { DataService } from 'src/app/services/data/data.service';
import { FormControl } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { HotkeysService } from 'src/app/services/hotkeys/hotkeys.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnDestroy {

  private subscriptions: Subscription[] = [];
  members: Member[] = (_members as any).default as Member[];
  titleControl: FormControl = new FormControl()
  searchedMembers: Member[] = this.members;
  allNames: string[];
  title: string;
  filteredMembers: Observable<string[]>;
  @ViewChild(MatInput) private filter: MatInput;

  constructor(
    public data: DataService,
    private shortcut: HotkeysService) {

      this.allNames = this.getAllNames()

      this.filteredMembers = this.titleControl.valueChanges
      .pipe(
        startWith(""),
        map((state) => state ? this._filterStates(state) : this.allNames.slice())
      );

      this.subscriptions.push(this.shortcut.addShortcut({ keys: "control.f", description: "Search" }).subscribe((event) => {
        this.filter.focus();
      }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(
      subscribed => {
        subscribed.unsubscribe();
        this.subscriptions.pop();
    });
  }

  searchMember(): void {
    if (!this.titleControl.value || this.titleControl.value.length === 0) {
      this.searchedMembers = this.members;
      this.titleControl.setValue("");
      this.title = "";
      return;
    }

    const searchallNames: string[] = this.allNames.filter((element) => this.filterallNames(element));
    this.searchedMembers = new Array();
    for (const title of searchallNames) {
      this.searchedMembers.push(this.members.find((movie) => movie.firstName === title || movie.lastName === title) as Member);
    }
  }

  private filterallNames(element: string): boolean {
    return element.toLowerCase().startsWith(this.title);
  }

  private getAllNames(): string[] {
    let ret: string[] = [];
    for (const member of this.members) {
      ret.push(member.firstName);
      ret.push(member.lastName);
    }
    return ret;
  }

  private _filterStates(value: string): string[] {
    const filterValue: string = value.toLowerCase();
    this.title = filterValue;
    return this.allNames.filter((title) => title.toLowerCase().indexOf(filterValue) === 0);
  }
}
