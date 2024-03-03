import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {MessageModule} from "primeng/message";
import {PanelMenuModule} from "primeng/panelmenu";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TreeModule} from "primeng/tree";
import { CoffeeListComponent } from './coffee-list/coffee-list.component';
import {TableModule} from "primeng/table";
import {ProductStateService} from "./service/product-state.service";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CoffeeListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FlexLayoutModule,
    MessageModule,
    PanelMenuModule,
    TreeModule,
    TableModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
