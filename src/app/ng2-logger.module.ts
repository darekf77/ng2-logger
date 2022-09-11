
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2LoggerComponent } from './ng2-logger.component';
// import { CanvasDrawerModule } from '@codete-ngrx-quick-start/shared'
// console.log(CanvasDrawerModule)

@NgModule({
  imports: [
    // CanvasDrawerModule,
    BrowserModule,
  ],
  declarations: [
    Ng2LoggerComponent,
  ],
  exports: [
    Ng2LoggerComponent
  ]
})
export class Ng2LoggerModule { }
