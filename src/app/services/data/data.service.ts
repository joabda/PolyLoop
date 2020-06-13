import { Injectable } from '@angular/core';
import { Title } from 'src/app/interfaces/titles';
import { Language } from 'src/app/enums/language';
import { BehaviorSubject } from 'rxjs';
import { Sponsor } from 'src/app/interfaces/sponsor';
import { ContactUsJSON } from 'src/app/interfaces/json/ContactUsJSON';
import * as _titles from 'src/assets/data/titles.json';
import * as _mission from 'src/assets/data/mission.json';
import * as _sponsors from 'src/assets/data/sponsors.json';
import * as _contactUs from 'src/assets/data/contact-us.json';

@Injectable()
export class DataService {

  language = new BehaviorSubject(Language.EN);
  currentSections: string[];
  static titles_ = (_titles as any).default as Title[];
  static mission_ = (_mission as any).default as Title[];
  static contactUs_ = (_contactUs as any).default as ContactUsJSON[];

  constructor() {
  }
  
  getMission(): string[] {
    if (this.language.value === Language.FR) {
      return DataService.mission_.map(function (el) {
        return el.fr;
      });
    } else {
      return DataService.mission_.map(function (el) {
        return el.en;
      });
    }
  }

  getTitles(): string[] {
    if (this.language.value === Language.FR) {
      this.currentSections = DataService.titles_.map(function (title) {
        return title.fr;
      });
    } else {
      this.currentSections = DataService.titles_.map(function (title) {
        return title.en;
      });
    }
    return this.currentSections;
  }

  getPrimarySponsors(): Sponsor[] {
    return (_sponsors as any).default as Sponsor[];
  }

  getContactUs(): ContactUsJSON {
    return DataService.contactUs_[this.language.value];
  }

}
