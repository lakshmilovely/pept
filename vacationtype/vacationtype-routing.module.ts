import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VacationtypeComponent } from './vacationtype.component';

const routes: Routes = [{ path: '', component: VacationtypeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VacationtypeRoutingModule { }
