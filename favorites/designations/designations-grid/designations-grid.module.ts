import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesignationsGridRoutingModule } from './designations-grid-routing.module';
import { DesignationsGridComponent } from './designations-grid.component';
import { FeaturesModule } from '../../Features.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [DesignationsGridComponent],
  imports: [
    CommonModule,
    DesignationsGridRoutingModule,
    FeaturesModule, NgxSpinnerModule, FormsModule, ReactiveFormsModule
  ]
})
export class DesignationsGridModule { }
