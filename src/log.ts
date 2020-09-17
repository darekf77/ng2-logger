import { Logger } from './logger';
import { Level } from './level';
import { Display } from './display';
import { contain } from './include';
import { Helpers } from './helper';
//#region @backend
declare var require: any;
//#endregion

if (Helpers.isNode) {
  //#region @backend
  var randomcolor = require('randomcolor');
  //#endregion
}

export class Log {

  public static instances: { [moduleName: string]: Logger<any> } = {};

  static create<TA>(name: string, ...level: Level[]): Logger<TA> {
    let i: Logger<TA>;
    if (Log.instances[name] === undefined) {
      i = new Logger<TA>(
        name,
        Log.getRandomColor(),
        Log.isDevelopmentMode,
        level,
        Log.isMutedModule(name),
        Log.levels.length > 0 ? Log.fixedWidth : undefined,
        // Log.levels.length > 0 ? Log.display : undefined,
      );
      Log.instances[name] = i;
    } else {
      i = Log.instances[name];
    }
    return i;
  }

  private static getRandomColor(): string {
    if (Helpers.isNode) {
      //#region @backend
      return randomcolor({ luminosity: 'light', count: 10 });
      //#endregion
    }

    let letters = '012345'.split('');
    let color = '#';
    color += letters[Math.round(Math.random() * 5)];
    letters = '0123456789ABCDEF'.split('');
    for (let i = 0; i < 5; i++) {
      color += letters[Math.round(Math.random() * 15)];
    }
    if (color === undefined) return this.getRandomColor();
    return color;
  }

  private static display(name: string, data: any, incomming: Level, moduleName: string) {
    if (!contain(Log.levels, incomming)) return;
    if (incomming === Level.DATA) {
      Display.msg(name, data, moduleName, Log.instances[moduleName].color,
        Level.DATA, Log.instances[moduleName].fixedWidth);
    }
    if (incomming === Level.ERROR) {
      Display.msg(name, data, moduleName, Log.instances[moduleName].color,
        Level.ERROR, Log.instances[moduleName].fixedWidth);
    }
    if (incomming === Level.INFO) {
      Display.msg(name, data, moduleName, Log.instances[moduleName].color,
        Level.INFO, Log.instances[moduleName].fixedWidth);
    }
    if (incomming === Level.WARN) {
      Display.msg(name, data, moduleName, Log.instances[moduleName].color,
        Level.WARN, Log.instances[moduleName].fixedWidth);
    }
  }

  private static fixedWidth = 0;
  private static _logOnly = false;
  public static levels: Level[] = [];
  static onlyLevel(...level: Level[]) {
    if (Log._logOnly) {
      throw '[ng2-logger] You should use funcion onlyLevel only once';
    }
    if (!Log._logOnly) {
      Log._logOnly = true;
    }

    Log.levels = Array.isArray(level) ? level : [level];


    for (const logName in Log.instances) {
      if (Log.instances.hasOwnProperty(logName)) {
        const element = Log.instances[logName];
        element['allowed'] = Log.levels;
      }
    }
  }

  private static _logModules = false;
  private static modules: (string | RegExp)[] = [];
  static onlyModules(...modules: (string | RegExp)[]) {
    if (Log._logModules) {
      throw '[ng2-logger] You should use funcion onlyModules only once';
    }
    if (!Log._logModules) {
      Log._logModules = true;
    }
    if (modules.length === 0) return;
    Log.modules = modules;
    // console.log('only log this', Log.modules)
    Log.muteAllOtherModules();
  }
  private static isMutedModule(moduleName: string): boolean {
    if (Log.modules.length == 0) return false;
    if (!contain(Log.modules, moduleName)) return true;
    return false;
  }
  private static muteAllOtherModules() {
    for (var moduleName in Log.instances) {
      if (!contain(Log.modules, moduleName))
        Log.instances[moduleName].mute()
    }
  }

  private static isDevelopmentMode = true;
  private static modeIsSet: boolean = false;
  static setProductionMode() {
    if (Log.modeIsSet) {
      Log.modeIsSet = false
      throw '[ng2-logger] Production mode is already set';
    } else {
      Log.modeIsSet = true;
      setTimeout(() => {

        if (Log.modeIsSet && console !== undefined && console.clear !== undefined) {

          console.clear();
          console.log = () => { };
          console.error = () => { };
          console.warn = () => { };
          console.info = () => { };
        }
      });

      Logger.isProductionMode = true;
      Log.isDevelopmentMode = false;
    }
  }
}
