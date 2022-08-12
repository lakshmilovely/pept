import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VacationAdminComponent } from './vacation-admin.component';

const routes: Routes = [{ path: '', component: VacationAdminComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VacationAdminRoutingModule { }
