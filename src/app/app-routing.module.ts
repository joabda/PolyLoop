import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntroComponent } from './components/intro/intro.component';
import { MembersComponent } from './components/members/members.component';
import { AppComponent } from './app.component';
import { SponsorsComponent } from './components/sponsors/sponsors.component';


const routes: Routes = [
  { path: "sponsors", component: SponsorsComponent    },
  { path: "team", component: MembersComponent    },
  { path: "", component: IntroComponent    },
  { path: "*"     , component: IntroComponent      }, // Home Page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
