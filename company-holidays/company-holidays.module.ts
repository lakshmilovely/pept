import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyHolidaysRoutingModule } from './company-holidays-routing.module';
import { CompanyHolidaysComponent } from './company-holidays.component';
import { FeaturesModule } from '../Features.module';
// import { SortDirective } from 'src/app/directives/sort/sort.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CompanyHolidaysComponent],
  imports: [
    CommonModule,
    CompanyHolidaysRoutingModule,
    FeaturesModule, FormsModule,
    ReactiveFormsModule

  ]
})
export class CompanyHolidaysModule { }
