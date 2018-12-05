import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Log, Level } from 'ng2-logger/browser';
const log = Log.create('app module');

log.i('module!')

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
