//#region @notForNpm
import 'core-js/proposals/reflect-metadata'; // TODO @LAST
import 'core-js/es';
import { Morphi } from 'morphi';

//#region @backend
/**
 * This quick fix if somhow I am using on backend document and localstorage
 */
Morphi.setIsBackend();
if (typeof localStorage === "undefined" || localStorage === null) {
  const LocalStorage = require('node-localstorage').LocalStorage;
  global['localStorage'] = new LocalStorage('./tmp-local-storage');
  global['sessionStorage'] = new LocalStorage('./tmp-session-storage');
}

if (typeof document === "undefined" || document === null) {
  const jsdom = require('jsdom');
  const { JSDOM } = jsdom;
  const window = (new JSDOM(``)).window;
  global['window'] = window;
  const { document } = window;
  global['document'] = document;
}

if (typeof global['Zone'] === "undefined" || global['Zone'] === null) {
  global['Zone'] = {
    __load_patch: () => { },
    __symbol__: () => { }
  };
}
//#endregion

//#region isomorphic imports
import { DraggablePopupComponent, DraggablePopupModule } from 'tnp-ui';
import { Log, Level } from './index';
const log = Log.create(`app`, Level.__NOTHING);
//#endregion

log.d(`Morphi.isBrowser: ${Morphi.isBrowser}, Morphi.isNode: ${Morphi.isNode}`)

if (Morphi.isBrowser) {
  require('zone.js/dist/zone');
  require('@angular/material/prebuilt-themes/indigo-pink.css');
}


//#region angular
import { Component, NgModule, ApplicationRef } from '@angular/core';
import { enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MatCardModule } from '@angular/material/card';
import { WebStorageModule } from 'ngx-store';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//#endregion

//#region local imports

//#endregion


const controllers = [
];

const host = 'http://localhost:3333';

@Component({
  selector: 'my-app', // <my-app></my-app>
  template: `
  <h1> Hello from component! </h1>
  <mat-card>
  Simple card
  <span class="iconify" data-icon="ic-baseline-pin" data-inline="false"></span>
  </mat-card>
  <mat-card>
  <mat-card-title>
  Processes
  </mat-card-title>
  <mat-card-subtitle  *ngIf="!processes">
    ...loading
  </mat-card-subtitle>
  <mat-card-content>

  <ng-template #popupContent>
  Hello content
  </ng-template>

  <app-draggable-popup
  [title]="'awesome'" >

  </app-draggable-popup>
  processes preview
  <div *ngFor="let p of processes" >
    <app-process-logger [model]="p"></app-process-logger>
  </div>

  </mat-card-content>

  </mat-card>
  `,
})
export class AppComponent {


  processes = [];
  async ngOnInit() {
    // const processes = await PROCESS.getAll();
    // log.d(`processes`, processes);
    // this.processes = processes;
  }
}

//#region angular module
@NgModule({
  imports: [
    BrowserModule,
    // HttpModule,
    BrowserAnimationsModule,
    FormsModule,
    ...[
      MatCardModule,
    ],
    // ProjectModule,
    // ProcessModule,
    DraggablePopupModule,
    WebStorageModule,
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    ...controllers
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// depending on the env mode, enable prod mode or add debugging modules
// if (ENV.isBUild === 'build') {
//   enableProdMode();
// }

export function main() {
  return platformBrowserDynamic().bootstrapModule(AppModule);
}

//#endregion


async function start() {

  //#region @backend
  const config = {
    type: "sqlite",
    database: 'tmp-db.sqlite',
    synchronize: true,
    dropSchema: true,
    logging: false
  };
  //#endregion

  // const context = await Morphi.init({
  //   host,
  //   controllers,
  //   entities: [
  //     // PROJECT, PROCESS
  //   ],
  //   //#region @backend
  //   config: config as any
  //   //#endregion
  // });
  // log.d(`context`, context);

  if (Morphi.isBrowser) {

    const head: HTMLElement = document.getElementsByTagName('head')[0];
    head.innerHTML = head.innerHTML +
      `<link href="https://fonts.googleapis.com/icon?family=Material+Icons&display=block" rel="stylesheet">`
    const body: HTMLElement = document.getElementsByTagName('body')[0];
    body.innerHTML = `
    <style>

    [mat-dialog-title] {
      margin: -24px -24px 0px -24px !important;
      padding: 10px 24px;
      background: gray;
      color: #fff;
      cursor: move;
    }


    .resizable-modal {
      mat-dialog-container {
        resize: both;
      }
    }

    </style>
    <my-app>Loading...</my-app>`;
    if (document.readyState === 'complete') {
      main();
    } else {
      document.addEventListener('DOMContentLoaded', main);
    }
  }
}

if (Morphi.isBrowser) {
  start();
}

export default start;
//#endregion
