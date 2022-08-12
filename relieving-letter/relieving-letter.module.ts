import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RelievingLetterRoutingModule } from './relieving-letter-routing.module';
import { RelievingLetterComponent } from './relieving-letter.component';
import { FeaturesModule } from '../Features.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgxPrintModule } from 'ngx-print';
import { OrdinalDatePipe } from 'src/app/Core/_pipes/ordinalDate/ordinal-date.pipe';
// import { SortDirective } from 'src/app/directives/sort/sort.directive';




@NgModule({
  declarations: [RelievingLetterComponent, OrdinalDatePipe],
  imports: [
    CommonModule,
    RelievingLetterRoutingModule, FeaturesModule,
    FormsModule, ReactiveFormsModule, NgxPrintModule

  ]
})
export class RelievingLetterModule { }
