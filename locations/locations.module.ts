import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationsRoutingModule } from './locations-routing.module';
import { LocationsComponent } from './locations.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { FeaturesModule } from '../Features.module';

@NgModule({
  declarations: [LocationsComponent],
  imports: [
    CommonModule,
    LocationsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule, FeaturesModule
  
  ]
})
export class LocationsModule { }
