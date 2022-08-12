import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayslipComponent } from './payslip.component';

const routes: Routes = [{ path: '', component: PayslipComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayslipRoutingModule { }
