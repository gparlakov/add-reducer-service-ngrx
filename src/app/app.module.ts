import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OpaqueToken } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule, combineReducers, Reducer, Dispatcher, Store } from "@ngrx/store";

import { AppComponent } from './app.component';

import { AppStateModule } from "./state/app-state.module";

import { TodoesComponent } from "./todoes/todoes.component";
import { CommonModule } from "@angular/common";
import { AddReducersModule } from "./state/add-reducers.module";
import { AddReducersService } from "app/state/add-reducers.service";

export const ADD_REDUCER = new OpaqueToken("ADD_REDUCER");


@NgModule({
  declarations: [
    AppComponent, TodoesComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    StoreModule.provideStore({}),
    
  ],
  providers: [ 
      {provide: AddReducersService, useClass: AddReducersService, deps: [Store, Reducer, Dispatcher]}
    ], // { provide: ADD_REDUCER, useValue: changeMyAppReducer}
  bootstrap: [AppComponent]
})
export class AppModule { }
