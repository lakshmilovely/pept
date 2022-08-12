import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupportrequestypesComponent } from './supportrequestypes.component';

const routes: Routes = [{ path: '', component: SupportrequestypesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportrequestypesRoutingModule { }
