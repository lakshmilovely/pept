import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UrltypesRoutingModule } from './urltypes-routing.module';
import { UrltypesComponent } from './urltypes.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { FeaturesModule } from '../Features.module';


@NgModule({
  declarations: [UrltypesComponent],
  imports: [
    CommonModule,
    UrltypesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule, FeaturesModule
  ]
})
export class UrltypesModule { }
