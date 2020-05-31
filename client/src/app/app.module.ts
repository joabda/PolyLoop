import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule, MatToolbarModule, MatIconModule, MatListModule, MatDialogModule, MatCardModule } from '@angular/material';
import { IntroComponent } from './components/intro/intro.component';
import { DataService } from './services/data/data.service';
import { FooterComponent } from './components/footer/footer.component';
import { MembersComponent } from './components/members/members.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { SponsorsComponent } from './components/sponsors/sponsors.component';

@NgModule({
  declarations: [
    AboutUsComponent,
    AppComponent,
    FooterComponent,
    IntroComponent,
    MembersComponent,
    NavBarComponent,
    SponsorsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,

  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
