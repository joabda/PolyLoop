import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { AboutJSON } from 'src/app/interfaces/json/aboutJSON';
import { FeatureItem } from 'src/app/interfaces/feature-item';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent {

  text: AboutJSON;
  col1: FeatureItem[];
  col2: FeatureItem[];

  constructor(private data: DataService) { 
    this.data.language.subscribe( () => {
      this.text = data.getAbout();
      const center = this.text.features.length / 2;
      this.col1 = this.text.features.slice(0, center);
      this.col2 = this.text.features.slice(center);
    });
  }

}
