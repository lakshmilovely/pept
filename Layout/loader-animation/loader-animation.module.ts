import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderAnimationComponent } from './loader-animation.component';



@NgModule({
  declarations: [LoaderAnimationComponent],
  imports: [
    CommonModule,
    
  ],
  exports:[LoaderAnimationComponent]
})
export class LoaderAnimationModule { }
