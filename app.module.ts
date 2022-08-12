import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FeaturesModule } from './Features/Features.module';
import { DateFormatPipe } from '../app/Core/_pipes/date-format/date-format.pipe';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DirectiveModule} from "./../app/directives/directive/directive.module";
import { PagenotfoundComponent } from './Layout/pagenotfound/pagenotfound.component';


@NgModule({
  declarations: [
    AppComponent,
    DateFormatPipe,
    PagenotfoundComponent 
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FeaturesModule,
    BrowserAnimationsModule,
    DirectiveModule    
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [BrowserAnimationsModule]
})
export class AppModule { }
