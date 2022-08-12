import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from '../profile.component';

import { GridUsersComponent } from './grid-users.component';

const routes: Routes = [{ path: '', component: GridUsersComponent },
{ path: 'profile', component: ProfileComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GridUsersRoutingModule { }
