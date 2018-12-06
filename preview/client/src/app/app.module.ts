import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Log, Level } from 'ng2-logger/browser';
const log = Log.create('app module');

Log.onlyLevel(Level.ERROR)
// Log.onlyLevel(Level.WARN)
// Log.onlyModules( new RegExp('.*component') )
Log.onlyModules( 'app module')

// log.fixedWidth = 200;

log.i('module!')
log.er('moduleer r')

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
