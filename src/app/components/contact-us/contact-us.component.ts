import { Component } from '@angular/core';
import * as _info from 'src/assets/data/infos.json'

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent {
  
  info = (_info as any).default[0] as {phoneNumber: string, email: string};
  constructor() { }

}
