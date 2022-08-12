import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VacationsRoutingModule } from './vacations-routing.module';
import { VacationsComponent } from './vacations.component';
 import{ReactiveFormsModule}from '@angular/forms';
 import { FeaturesModule } from '../Features.module';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [VacationsComponent],
  imports: [
    FeaturesModule,
    CommonModule,
    VacationsRoutingModule,
    ReactiveFormsModule, NgxSpinnerModule
    
  ]
})
export class VacationsModule { }
