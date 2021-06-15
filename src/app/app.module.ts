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
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatTableModule} from "@angular/material/table";
import { ColorThemePickerComponent } from './color-theme-picker/color-theme-picker.component';
import {MatMenuModule} from "@angular/material/menu";
import { LazyLoadDirective } from './directives/lazy-load.directive';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatFormFieldModule} from "@angular/material/form-field";


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    TableComponent,
    SearchFieldComponent,
    NavbarComponent,
    BadgeFavoriteComponent,
    ColorThemePickerComponent,
    LazyLoadDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatGridListModule,
    MatTableModule,
    MatMenuModule,
    FlexLayoutModule,
    MatFormFieldModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
