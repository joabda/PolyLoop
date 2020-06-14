import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DataService } from 'src/app/services/data/data.service';
import { ContactUsJSON } from 'src/app/interfaces/json/ContactUsJSON';
import { HttpStatus } from 'src/app/enums/http-codes';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as _info from 'src/assets/data/infos.json'

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
  static PROXY = 'https://cors-anywhere.herokuapp.com/';

  constructor(private snacks: MatSnackBar, private http: HttpClient, private data: DataService) {
    data.language.subscribe(() => {
      this.text = data.getContactUs();
    });

    this.resetInputs();
   }


  submit(): void {
    try {
      if (this.valid()) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');
        this.http.post(`${ContactUsComponent.PROXY}https://docs.google.com/forms/d/e/1FAIpQLSePkTgeZOEqt_K6uYSCocK9_n00Wm-e1L1-nhUUs30f9clxMA/formResponse?` +
          this.getURLData(),
          {headers: headers}
        )
        .toPromise()
        .catch(res => {
          if((res as HttpErrorResponse).status == HttpStatus.OK ) {
            this.openSnack(this.data.getSent());
            this.resetInputs();
          } else {
            this.openSnack(this.data.errorMessage());
          }
        })
      }
    } catch (e) {
      this.openSnack(this.data.errorMessage());
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
      `&entry.993607557=${this.encodeUTF8(this.currentValues.reason)}` +
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

  private openSnack(message: string): void {
    this.snacks.open(
      message,
      "",
      {
        duration: 3000,
        verticalPosition: "bottom",
        horizontalPosition: "center"
      }
    );
  }

  private resetInputs(): void {
    this.currentValues = {
      name: "",
      email: "",
      reason: "",
      message: ""
    };
  }
}
