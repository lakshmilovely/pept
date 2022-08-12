import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FeaturesRoutingModule } from '../Features/Features-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../Layout/header/header.component';
import { FooterComponent } from '../Layout/footer/footer.component';
import { LeftPanelComponent } from '../Layout/left-panel/left-panel.component';
import { OccasionsComponent } from './occasions/occasions.component';


@NgModule({
    declarations: [HeaderComponent, FooterComponent, LeftPanelComponent, OccasionsComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, FeaturesRoutingModule],
    providers: [DatePipe],
    exports: [HeaderComponent, FooterComponent, LeftPanelComponent
    ]
})
export class FeaturesModule { }