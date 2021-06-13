import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './layout/layout.component';
import { TableComponent } from './table/table.component';
import { SearchFieldComponent } from './search-field/search-field.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BadgeFavoriteComponent } from './badge-favorite/badge-favorite.component';

import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    TableComponent,
    SearchFieldComponent,
    NavbarComponent,
    BadgeFavoriteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
