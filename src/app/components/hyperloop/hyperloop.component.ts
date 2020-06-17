import { Component, AfterViewInit } from '@angular/core';
import { HistoryJSON } from 'src/app/interfaces/json/historyJSON';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-hyperloop',
  templateUrl: './hyperloop.component.html',
  styleUrls: ['./hyperloop.component.scss']
})
export class HyperloopComponent implements AfterViewInit{

  text: HistoryJSON;

  constructor(private data: DataService) {
    data.language.subscribe( () => {
      this.text = data.getHistory();
      for(let i = 0; i < this.text.events.length; ++i) {
        const event = this.text.events[i];
        if(event.imgSrc.length > 4) {
          document.getElementById(`event-img-${i}`).style.backgroundImage = event.imgSrc;
        }
      }
    });
  }

  ngAfterViewInit(): void {
    for(let i = 0; i < this.text.events.length; ++i) {
      const event = this.text.events[i];
      if(event.imgSrc.length > 4) {
        document.getElementById(`event-img-${i}`).style.backgroundImage = event.imgSrc;
      }
    }
  }
}
