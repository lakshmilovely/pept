import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { GridUsersRoutingModule } from './grid-users-routing.module';
import { GridUsersComponent } from './grid-users.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { FeaturesModule } from '../../Features.module';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [GridUsersComponent],
  imports: [
    CommonModule,
    GridUsersRoutingModule, NgxSpinnerModule,Ng2SearchPipeModule,
    ReactiveFormsModule,FormsModule, HttpClientModule, FeaturesModule
  ]
})
export class GridUsersModule { }
