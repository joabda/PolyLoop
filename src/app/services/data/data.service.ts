import { Injectable } from '@angular/core';
import { Title } from 'src/app/interfaces/titles';
import { Language } from 'src/app/enums/language';
import { BehaviorSubject } from 'rxjs';
import { Sponsor } from 'src/app/interfaces/sponsor';
import { ContactUsJSON } from 'src/app/interfaces/json/ContactUsJSON';
import { AboutJSON } from 'src/app/interfaces/json/aboutJSON';
import { SponsorJSON } from 'src/app/interfaces/json/sponsorJSON';
import * as _titles from 'src/assets/data/titles.json';
import * as _sponsors from 'src/assets/data/sponsors.json';
import * as _contactUs from 'src/assets/data/contact-us.json';
import * as _about from 'src/assets/data/about.json';

@Injectable()
export class DataService {

  language = new BehaviorSubject(Language.EN);
  currentSections: string[];
  static titles_ = (_titles as any).default as Title[];
  static contactUs_ = (_contactUs as any).default as ContactUsJSON[];
  static about_ = (_about as any).default as AboutJSON[];
  static sponsors_ = (_sponsors as any).default as SponsorJSON[]

  constructor() {
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

  getSponsors(): SponsorJSON[] {
    return DataService.sponsors_;
  }

  getContactUs(): ContactUsJSON {
    return DataService.contactUs_[this.language.value];
  }

  getAbout(): AboutJSON {
    return DataService.about_[this.language.value];
  }

}
