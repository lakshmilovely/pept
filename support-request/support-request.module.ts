import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupportRequestRoutingModule } from './support-request-routing.module';
import { SupportRequestComponent } from './support-request.component';
import { FeaturesModule } from '../Features.module';

@NgModule({
  declarations: [SupportRequestComponent],
  imports: [
    CommonModule,
    SupportRequestRoutingModule,
    FeaturesModule
  ]
})
export class SupportRequestModule { }
