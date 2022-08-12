import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequesttypesComponent } from './requesttypes.component';

const routes: Routes = [{ path: '', component: RequesttypesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequesttypesRoutingModule { }
