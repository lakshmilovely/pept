import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayslipRoutingModule } from './payslip-routing.module';
import { PayslipComponent } from './payslip.component';
import { FeaturesModule } from '../Features.module';


@NgModule({
  declarations: [PayslipComponent],
  imports: [
    CommonModule,
    PayslipRoutingModule, FeaturesModule,
  ]
})
export class PayslipModule { }
