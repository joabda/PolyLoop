import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntroComponent } from './components/intro/intro.component';
import { MembersComponent } from './components/members/members.component';
import { SponsorsComponent } from './components/sponsors/sponsors.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { HyperloopComponent } from './components/hyperloop/hyperloop.component';


const routes: Routes = [
  { path: "hyperloop", component: HyperloopComponent },
  { path: "contact", component: ContactUsComponent },
  { path: "sponsors", component: SponsorsComponent    },
  { path: "team", component: MembersComponent    },
  { path: "", component: IntroComponent    },
  { path: "*"     , component: IntroComponent      }, // Home Page
  { path: "**"     , component: IntroComponent      }, // Home Page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
