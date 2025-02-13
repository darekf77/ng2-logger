//#region @backend
declare const global: any;
//#endregion
import { Level } from './level';
import { Helpers } from 'tnp-core/src';
import { consoleLog, displayParams } from './backend-logging';

//#region @backend
import chalk from 'chalk';
//#endregion

export class Display {

  static msg(
    message: string | any,
    params: any[],
    moduleName: string,
    moduleColor: string,
    level: Level,
    moduleWidth: number | undefined,
    isProductionMode: boolean
  ) {
    if (isProductionMode) {
      return;
    };
    let color = 'gray';
    if (level === Level.INFO) { color = 'deepskyblue'; }
    if (level === Level.ERROR) { color = 'red'; }
    if (level === Level.WARN) { color = 'orange'; }

    if (moduleWidth) {
      const diff = moduleWidth - moduleName.length;
      if (diff > 0) {
        for (let i = 0; i < diff; i++) {
          moduleName += ' ';
        }
      }
    }

    //#region @browser
    if (Helpers.isBrowser
      //#region @backend
      && !global
      //#endregion
    ) {


      // @ts-ignore
      const isEdgeOrIe8orAbove = (document['documentMode'] || /Edge/.test(navigator.userAgent));

      if (isEdgeOrIe8orAbove) {
        if (typeof message === 'string') {
          let a1 = '[[ ' + moduleName + ' ]] ' + message + ' ';
          params.unshift(a1);
        } else {
          let a1 = '[[ ' + moduleName + ']] ';
          params.push(message);
          params.unshift(a1);
        }
        if (level === Level.INFO) {
          console.info.apply(console, params);
        } else if (level === Level.ERROR) {
          console.error.apply(console, params);
        } else if (level === Level.WARN) {
          console.warn.apply(console, params);
        } else {
          console.log.apply(console, params);
        }
      } else {
        if (typeof message === 'string') {
          let a1 = '%c ' + moduleName + '  %c ' + message + ' ';
          let a2 = 'background: ' + moduleColor + ';color:white; border: 1px solid ' + moduleColor + '; ';
          let a3 = 'border: 1px solid ' + color + '; ';
          params.unshift(a3);
          params.unshift(a2);
          params.unshift(a1);
        } else {
          let a1 = '%c ' + moduleName + ' ';
          let a2 = 'background: ' + moduleColor + ';color:white; border: 1px solid ' + color + '; ';
          params.push(message);
          params.unshift(a2);
          params.unshift(a1);
        }
        console.log.apply(console, params);
      }

    }
    //#endregion

    //#region @backend
    if (Helpers.isNode) {

      let a1 = chalk.bgHex(moduleColor)(global.hideLog ? '' : `${chalk.black(moduleName)}`);
      let p = params;
      if (typeof message === 'string') {
        a1 = a1 + chalk.keyword(color)(global.hideLog ? '' : ' [') + chalk.dim(message)
          + chalk.keyword(color)(global.hideLog ? '' : '] ');
      } else {
        p = [message].concat(params);
      }
      consoleLog(a1, level);
      displayParams(p, level);
    }
    //#endregion

  }

}
