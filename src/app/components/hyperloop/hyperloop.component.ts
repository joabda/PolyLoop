import { Component } from '@angular/core';
import { HistoryJSON } from 'src/app/interfaces/json/historyJSON';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-hyperloop',
  templateUrl: './hyperloop.component.html',
  styleUrls: ['./hyperloop.component.scss']
})
export class HyperloopComponent {

  text: HistoryJSON;

  constructor(private data: DataService) {
    data.language.subscribe( () => {
      this.text = data.getHistory();
      console.log(this.text)
    });
  }

}
