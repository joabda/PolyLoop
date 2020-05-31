import { Component } from '@angular/core';
import * as _members from '../../../assets/data/members.json';
import { Member } from 'src/app/interfaces/member';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent {

  members = (_members as any).default as Member[];
  constructor(public data: DataService) { }

}
