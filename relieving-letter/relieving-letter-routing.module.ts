import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RelievingLetterComponent } from './relieving-letter.component';

const routes: Routes = [{ path: '', component: RelievingLetterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelievingLetterRoutingModule { }
