import { Component } from '@angular/core';
import * as _info from 'src/assets/data/infos.json'
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/services/data/data.service';
import { ContactUsJSON } from 'src/app/interfaces/json/ContactUsJSON';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent {
  
  emailRegEx: RegExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  info = (_info as any).default[0] as {phoneNumber: string, email: string};
  currentValues: {
    name: string,
    email: string,
    reason: string,
    message: string
  };
  text: ContactUsJSON;

  constructor(private http: HttpClient, private data: DataService) {
    data.language.subscribe(() => {
      this.text = data.getContactUs();
    });

    this.currentValues = {
      name: "",
      email: "",
      reason: "",
      message: ""
    };
   }


  submit(): void {
    try {
      console.log('in funct');
      if (this.valid()) {
        console.log(`https://docs.google.com/forms/d/e/1FAIpQLSePkTgeZOEqt_K6uYSCocK9_n00Wm-e1L1-nhUUs30f9clxMA/formResponse?` +
        this.getURLData());
        this.http.post(`https://docs.google.com/forms/d/e/1FAIpQLSePkTgeZOEqt_K6uYSCocK9_n00Wm-e1L1-nhUUs30f9clxMA/formResponse?` +
          this.getURLData(),
          {}
        ).subscribe(res => console.log(res))
        // .subscribe(res => this.openSnack(this.text.thanks));
      }
    } catch (e) {
      // this.openSnack(this.text.errorSending);
    }
  }

  private valid(): boolean {
    return (
      this.currentValues.name.length != 0 &&
      this.currentValues.email.length != 0 &&
      this.emailRegEx.test(this.currentValues.email) &&
      this.currentValues.message.length != 0
    );
  }

  private getURLData(): string {
    return `entry.75568565=${this.currentValues.name}` +
      `&entry.21603732=${this.currentValues.email}` +
      `&entry.993607557=${this.currentValues.reason}` +
      `&entry.388409986=${this.encodeUTF8(this.currentValues.message)}`
      ;
  }

  private encodeUTF8(text: string): string {
    if (typeof text != 'string') {
      throw new TypeError('Param is not a string');
    }
    return text.replace(
      /[\u0080-\u07ff]/g,  // U+0080 - U+07FF => 2 bytes 110yyyyy, 10zzzzzz
      c => {
        const cc = c.charCodeAt(0);
        return String.fromCharCode(0xc0 | cc >> 6, 0x80 | cc & 0x3f);
      }
    )
      .replace(
        /[\u0800-\uffff]/g,  // U+0800 - U+FFFF => 3 bytes 1110xxxx, 10yyyyyy, 10zzzzzz
        c => {
          const cc = c.charCodeAt(0);
          return String.fromCharCode(0xe0 | cc >> 12, 0x80 | cc >> 6 & 0x3F, 0x80 | cc & 0x3f);
        }
      )
      .replace(/\s/g, '+');
  }
}
