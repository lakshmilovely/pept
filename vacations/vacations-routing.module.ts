import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VacationsComponent } from './vacations.component';


const routes: Routes = [{ path: '', component: VacationsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VacationsRoutingModule { }
