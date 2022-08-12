import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequesttypesRoutingModule } from './requesttypes-routing.module';
import { RequesttypesComponent } from './requesttypes.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { FeaturesModule } from '../Features.module';

@NgModule({
  declarations: [RequesttypesComponent],
  imports: [
    CommonModule,
    RequesttypesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule, FeaturesModule
  ]
})
export class RequesttypesModule { }
