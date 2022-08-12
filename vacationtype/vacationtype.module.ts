import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VacationtypeRoutingModule } from './vacationtype-routing.module';
import { VacationtypeComponent } from './vacationtype.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { FeaturesModule } from '../Features.module';

@NgModule({
  declarations: [VacationtypeComponent],
  imports: [
    CommonModule,
    VacationtypeRoutingModule,
    ReactiveFormsModule,
    FormsModule ,
    NgxSpinnerModule, FeaturesModule
  ]
})
export class VacationtypeModule { }
