import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { SponsorJSON } from 'src/app/interfaces/json/sponsorJSON';


@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.scss']
})
export class SponsorsComponent {

  sponsors: SponsorJSON[];

  constructor(public data: DataService) {
    this.sponsors = data.getSponsors();
  }

}
