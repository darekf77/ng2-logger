import { Component, NgModule } from '@angular/core';
import { Log } from '../lib';

const log = Log.create('my logger!')

@Component({
  selector: 'app-ng2-logger', // <my-app></my-app>
  template: '    <h1> Hello from component! </h1>  ',
})
export class AppComponent {
  processes = [];
  async ngOnInit() {
    // const processes = await PROCESS.getAll();
    log.d(`hello from loger`);
    // this.processes = processes;
  }
}
