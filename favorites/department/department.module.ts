import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentRoutingModule } from './department-routing.module';
import { DepartmentComponent } from './department.component';
import { FeaturesModule } from '../Features.module';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
@NgModule({
  declarations: [DepartmentComponent],
  imports: [
    CommonModule,
    DepartmentRoutingModule,
    FeaturesModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule
  ]
})
export class DepartmentModule { }
