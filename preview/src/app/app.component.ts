/*
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { AppState } from './app.service';

import { Log, Level } from '../../../src';
const log = Log.create('app controller')
const log2 = Log.create('app ')


/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  template: `
    
    Helll ng2-logger
  `
})
export class AppComponent implements OnInit {
  public angularclassLogo = 'assets/img/angularclass-avatar.png';
  public name = 'Angular 2 Webpack Starter';
  public url = 'https://twitter.com/AngularClass';

  constructor(
    public appState: AppState
  ) { }

  public ngOnInit() {
    console.log('Initial App State', this.appState.state);
    log.fixedWidth = 50;

    log.d('important  debug', this.appState)
    log.er('important  error')
    log.i('important  info')
    log.w('important  warn')

    log.fixedWidth = undefined;
    log2.d('debug')
    log2.er('error')
    log2.i('info', document.location)
    log2.w('warn')

    log.data('aaaaaa')

    let d = {
      dupa: 'asdasdasd',
      'asdasd': 'asdasd'
    }

    console.dir('document.location1', document.location, document.location)
  }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
