import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { AboutJSON } from 'src/app/interfaces/json/aboutJSON';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent {

  text: AboutJSON;

  constructor(private data: DataService) { 
    this.data.language.subscribe( () => {
      this.text = data.getAbout();
    });
  }

}
