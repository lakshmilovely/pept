import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OurteamRoutingModule } from './ourteam-routing.module';
import { OurteamComponent } from './ourteam.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { FeaturesModule } from '../Features.module';
@NgModule({
  declarations: [OurteamComponent],
  imports: [
    CommonModule,
    OurteamRoutingModule,
    NgxSpinnerModule, FeaturesModule
  ]
})
export class OurteamModule { }
