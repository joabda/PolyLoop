import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { IntroComponent } from './components/intro/intro.component';
import { DataService } from './services/data/data.service';
import { FooterComponent } from './components/footer/footer.component';
import { MembersComponent } from './components/members/members.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { SponsorsComponent } from './components/sponsors/sponsors.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { HttpClientModule } from '@angular/common/http';
import { HyperloopComponent } from './components/hyperloop/hyperloop.component';

@NgModule({
  declarations: [
    AboutUsComponent,
    AppComponent,
    FooterComponent,
    IntroComponent,
    MembersComponent,
    NavBarComponent,
    SponsorsComponent,
    ContactUsComponent,
    HyperloopComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule,
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
