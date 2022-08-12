import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeaturesModule } from '../Features.module';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    HttpClientModule, NgxSpinnerModule,FormsModule,
    ReactiveFormsModule, FeaturesModule

  ]
})
export class ProfileModule { }
