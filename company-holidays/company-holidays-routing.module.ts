import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyHolidaysComponent } from './company-holidays.component';

const routes: Routes = [{ path: '', component: CompanyHolidaysComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyHolidaysRoutingModule { }
