import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UrltypesComponent } from './urltypes.component';

const routes: Routes = [{ path: '', component: UrltypesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UrltypesRoutingModule { }
