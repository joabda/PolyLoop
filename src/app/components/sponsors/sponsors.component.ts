import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { Sponsor } from 'src/app/interfaces/sponsor';

@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.scss']
})
export class SponsorsComponent {

  primarySponsors: Sponsor[][];

  constructor(public data: DataService) {
    const sponsors = data.getPrimarySponsors();
    let currentIndex = 0;
    this.primarySponsors = [];
    for(let i = 0; i < Math.ceil(sponsors.length / 2); ++i) {
      this.primarySponsors[i] = [];
      for(let j = 0; j < 2; ++j) {
        this.primarySponsors[i][j] = sponsors[currentIndex++];
      }
    }
    // const sponsors2 = data.getSecondaySponsors();
    // this.col[2] = sponsors.slice(0, sponsors.length / 2);
    // this.col[3] = sponsors.slice(sponsors.length / 2);
    // this.col[4] = sponsors.slice(0, sponsors.length / 2);
    // this.col[5] = sponsors.slice(sponsors.length / 2);
  }

}
