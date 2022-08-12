import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { FeaturesModule } from '../Features.module';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [CalendarComponent],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    NgbModule, FormsModule, FeaturesModule, NgxSpinnerModule
  ]
})
export class CalendarModule { }
