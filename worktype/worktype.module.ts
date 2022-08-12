import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorktypeRoutingModule } from './worktype-routing.module';
import { WorktypeComponent } from './worktype.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { FeaturesModule } from '../Features.module';

@NgModule({
  declarations: [WorktypeComponent],
  imports: [
    CommonModule,
    WorktypeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule, FeaturesModule
  ]
})
export class WorktypeModule { }
