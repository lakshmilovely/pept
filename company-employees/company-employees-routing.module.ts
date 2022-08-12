import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyEmployeesComponent } from './company-employees.component';

const routes: Routes = [{ path: '', component: CompanyEmployeesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyEmployeesRoutingModule { }
