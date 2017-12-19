import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';

import {HeaderComponent} from './header/header.component';
import { FiltersComponent } from './filters/filters.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BodySectionComponent } from './body-section/body-section.component';
import { ItemsComponent } from './items/items.component';
import { FormBoxComponent } from './form-box/form-box.component';
import { SelectBoxComponent } from './select-box/select-box.component';
import { TitleBoxComponent } from './title-box/title-box.component';
import { SwitchOptionsComponent } from './switch-options/switch-options.component';
import { AppRoutingModule } from '.././app-routing.module';
import { AccordionInputComponent } from './accordion-input/accordion-input.component';
import { FanInfoComponent } from './fan-info/fan-info.component';
import { TabsComponent } from './tabs/tabs.component';
import { FooterComponent } from './footer/footer.component';
import { LabelBoxComponent } from './label-box/label-box.component';
import { FeatureItemsComponent } from './feature-items/feature-items.component';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    Ng2AutoCompleteModule
  ],
  declarations: [
    HeaderComponent,
    FiltersComponent,
    SidebarComponent,
    BodySectionComponent,
    ItemsComponent,
    FormBoxComponent,
    SelectBoxComponent,
    TitleBoxComponent,
    SwitchOptionsComponent,
    AccordionInputComponent,
    FanInfoComponent,
    TabsComponent,
    FooterComponent,
    LabelBoxComponent,
    FeatureItemsComponent,
  ],
  exports: [
    HeaderComponent,
    FiltersComponent,
    SidebarComponent,
    BodySectionComponent,
    FormBoxComponent,
    SelectBoxComponent,
    SwitchOptionsComponent,
    AccordionInputComponent,
    FanInfoComponent,
    TabsComponent,
    FooterComponent

  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SharedModule { }
