import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { NvD3Module } from 'ng2-nvd3';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CatalogueComponent } from './components/catalogue/catalogue.component';
import { ParametersComponent } from './components/parameters/parameters.component';
import { TestPdfComponent } from './components/test-pdf/test-pdf.component';
import { ChartComponent } from './components/chart/chart.component';
import { FanDetailsComponent } from './components/fan-details/fan-details.component';
import { ChooseModelComponent } from './components/choose-model/choose-model.component';

import { MainService } from './services/main.service';
import { CatalogueService } from './services/catalogue/catalogue.service';
import { HelperService } from './services/helper/helper.service';
import { SecurityService } from './services/security/security.service';
import { AuthService } from './services/auth/auth.service';

import { FilterPipe } from './pipes/filter/filter.pipe';
import { SortPipe } from './pipes/sort/sort.pipe';
import { RouteNotFoundComponent } from './components/route-not-found/route-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    CatalogueComponent,
    ParametersComponent,
    TestPdfComponent,
    FanDetailsComponent,
    ChartComponent,
    ChooseModelComponent,
    FilterPipe,
    SortPipe,
    RouteNotFoundComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    NvD3Module,
    HttpClientModule
  ],
  providers: [
    MainService,
    HelperService,
    CatalogueService,
    SecurityService,
    AuthService
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
