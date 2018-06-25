import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Route } from '@angular/router';
import {HttpClientModule} from '@angular/common/http'
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CountryListComponent } from './country-list/country-list.component';
import { CountryComponent } from './country/country.component';
import { NotFoundComponent } from './not-found/not-found.component';


import { HttpDataService } from './http-data.service';
import { BigNumber } from './custom-pipes/bigNumber.pipe';
import { LatLong } from './custom-pipes/latLong.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CountryListComponent,
    CountryComponent,
    NotFoundComponent,
    BigNumber,
    LatLong
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'country-list/:searchBy/:value', component: CountryListComponent, pathMatch:'full' },
      { path: 'country/:code', component: CountryComponent },
      { path: '**', component: NotFoundComponent }
    ]
    )
  ],
  providers: [HttpDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
