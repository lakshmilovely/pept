import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DesignationsComponent } from './designations.component';

const routes: Routes = [{ path: '', component: DesignationsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesignationsRoutingModule { }
