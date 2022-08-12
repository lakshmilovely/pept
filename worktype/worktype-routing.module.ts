import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorktypeComponent } from './worktype.component';

const routes: Routes = [{ path: '', component: WorktypeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorktypeRoutingModule { }
