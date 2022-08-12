import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { FeaturesModule } from '../Features.module';
import { DebounceDirective } from 'src/app/debounce.directive';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [DashboardComponent, DebounceDirective],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FeaturesModule, NgxSpinnerModule
  ]
})
export class DashboardModule { }
