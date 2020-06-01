import { Component, ViewChild } from '@angular/core';
import * as _members from '../../../assets/data/members.json';
import { Member } from 'src/app/interfaces/member';
import { DataService } from 'src/app/services/data/data.service';
import { FormControl } from '@angular/forms';
import { MatInput } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent {

  members: Member[];
  titleControl: FormControl;

  searchedMembers: Member[];
  filteredMembers: Observable<string[]>;
  titles: string[];
  title: string;

  constructor(public data: DataService) {
    this.members = (_members as any).default as Member[];
    this.searchedMembers = this.members;
    this.titleControl = new FormControl();
    this.titles = this.getTitles();

    this.filteredMembers = this.titleControl.valueChanges
      .pipe(
        startWith(""),
        map((state) => state ? this._filterStates(state) : this.titles.slice())
      );
  }

  searchMovie(): void {
    if (!this.titleControl.value || this.titleControl.value.length === 0) {
      this.searchedMembers = this.members;
      this.titleControl.setValue("");
      this.title = "";
      return;
    }

    const searchTitles: string[] = this.titles.filter((element) => this.filterTitles(element));
    this.searchedMembers = new Array();
    for (const title of searchTitles) {
      this.searchedMembers.push(this.members.find((movie) => movie.firstName === title || movie.lastName === title) as Member);
    }
  }

  private filterTitles(element: string): boolean {
    return element.toLowerCase().startsWith(this.title);
  }

  private getTitles(): string[] {
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
    return this.titles.filter((title) => title.toLowerCase().indexOf(filterValue) === 0);
  }
}
