import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent {

  text: string[]
  text2: string[]
  constructor(private data: DataService) { 
    this.data.language.subscribe( () => {
      const text = data.getMission();
      this.text = text.slice(0, 3);
      this.text2 = text.slice(3);
    });
  }

}
