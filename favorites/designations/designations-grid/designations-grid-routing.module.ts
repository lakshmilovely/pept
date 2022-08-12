import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DesignationsGridComponent } from './designations-grid.component';

const routes: Routes = [{ path: '', component: DesignationsGridComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesignationsGridRoutingModule { }
