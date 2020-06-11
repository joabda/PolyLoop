import { Injectable } from '@angular/core';
import { Title } from 'src/app/interfaces/titles';
import { Language } from 'src/app/enums/language';
import { BehaviorSubject } from 'rxjs';
import { Sponsor } from 'src/app/interfaces/sponsor';
import * as _titles from 'src/assets/data/titles.json'
import * as _mission from 'src/assets/data/mission.json'
import * as _sponsors from 'src/assets/data/sponsors.json'

@Injectable()
export class DataService {

  language = new BehaviorSubject(Language.EN);
  currentSections: string[];
  private titles_ = (_titles as any).default as Title[];
  private mission_ = (_mission as any).default as Title[];

  constructor() {
  }
  
  getMission(): string[] {
    if (this.language.value === Language.FR) {
      return this.mission_.map(function (el) {
        return el.fr;
      });
    } else {
      return this.mission_.map(function (el) {
        return el.en;
      });
    }
  }

  getTitles(): string[] {
    if (this.language.value === Language.FR) {
      this.currentSections = this.titles_.map(function (title) {
        return title.fr;
      });
    } else {
      this.currentSections = this.titles_.map(function (title) {
        return title.en;
      });
    }
    return this.currentSections;
  }

  getPrimarySponsors(): Sponsor[] {
    return (_sponsors as any).default as Sponsor[];
  }

}
