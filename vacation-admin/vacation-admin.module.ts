import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VacationAdminRoutingModule } from './vacation-admin-routing.module';
import { VacationAdminComponent } from './vacation-admin.component';
import{ReactiveFormsModule}from '@angular/forms'
import { FeaturesModule } from '../Features.module';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [VacationAdminComponent],
  imports: [
    CommonModule,
    FeaturesModule,
    VacationAdminRoutingModule,
    ReactiveFormsModule, NgxSpinnerModule
  ]
})
export class VacationAdminModule { }
