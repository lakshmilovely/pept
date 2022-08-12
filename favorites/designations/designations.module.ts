import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesignationsRoutingModule } from './designations-routing.module';
import { DesignationsComponent } from './designations.component';
import { FeaturesModule } from '../Features.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [DesignationsComponent],
  imports: [
    CommonModule, NgxSpinnerModule,
    DesignationsRoutingModule, FeaturesModule, FormsModule, ReactiveFormsModule
  ]
})
export class DesignationsModule { }
