import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyEmployeesRoutingModule } from './company-employees-routing.module';
import { CompanyEmployeesComponent } from './company-employees.component';
import { FeaturesModule } from 'src/app/Features/Features.module'


@NgModule({
  declarations: [CompanyEmployeesComponent],
  imports: [
    CommonModule,
    CompanyEmployeesRoutingModule, FeaturesModule
  ]
})
export class CompanyEmployeesModule { }
