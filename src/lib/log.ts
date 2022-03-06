import { Logger } from './logger';
import { Level, LevelOrder, LevelKey } from './level';
import { Helpers } from 'tnp-core';
//#region @backend
declare var require: any;
//#endregion


//#region @backend
import * as randomcolor from 'randomcolor';
const PROCESS_STDOUT_WRITE = 'process.stdout.write';
const PROCESS_STDER_WRITE = 'process.stder.write';
//#endregion


export class Log {
  //#region singleton
  private constructor() { }
  // @ts-ignore
  private static get instance(): any {
    // @ts-ignore
    if (!Log['_instance']) {
      // @ts-ignore
      Log['_instance'] = new Log();
    }
    // @ts-ignore
    return Log['_instance'];
  }
  //#endregion

  static Logger: (typeof Logger) = Logger;
  static create(name: string, ...level: Level[]): Logger {
    return Log.instance.create(name, ...level);
  }

  private static readonly consolelogfn = {};
  static disableLogs(level = Level.__NOTHING) {
    //#region @backend
    // if (Helpers.isNode && (level === Level.__NOTHING)) {
    //   if (!this.consolelogfn[PROCESS_STDOUT_WRITE]) {
    //     this.consolelogfn[PROCESS_STDOUT_WRITE] = process.stdout.write; // TOOD not working
    //   }
    //   process.stdout.write = (() => { }) as any;
    // }
    //#endregion
    LevelOrder.reverse().find(a => {
      // @ts-ignore
      if (!this.consolelogfn[a]) {
        // @ts-ignore
        this.consolelogfn[a] = console[a];
      }
      // @ts-ignore
      console[a] = () => { };
      if (a === LevelKey[level]) {
        return true;
      }
      return false;
    });
  }

  static enableLogs() {
    //#region @backend
    // if (Helpers.isNode) {
    //   process.stdout.write = this.consolelogfn[PROCESS_STDOUT_WRITE];
    // }
    //#endregion
    LevelOrder.forEach(a => {
      // @ts-ignore
      console[a] = this.consolelogfn[a]
    });
  }

  private _logOnly = false;
  private _logModules = false;
  private isDevelopmentMode = true;
  private modeIsSet: boolean = false;
  private fixedWidth = 0;
  private instances: { [moduleName: string]: Logger } = {};
  private levels: Level[] = [];
  private modules: (string | RegExp)[] = [];

  //#region public api
  public setProductionMode() {
    if (this.modeIsSet) {
      this.modeIsSet = false
      throw '[ng2-logger] Production mode is already set';
    } else {
      this.modeIsSet = true;
      setTimeout(() => {

        if (this.modeIsSet && console !== void 0 && console.clear !== void 0) {

          console.clear();
          console.log = () => { };
          console.error = () => { };
          console.warn = () => { };
          console.info = () => { };
        }
      });

      this.isDevelopmentMode = false;
    }
  }

  public onlyModules(...modules: (string | RegExp)[]) {
    if (this._logModules) {
      throw '[ng2-logger] You should use funcion onlyModules only once';
    }
    if (!this._logModules) {
      this._logModules = true;
    }
    if (modules.length === 0) return;
    this.modules = modules;
    // console.log('only log this', Log.modules)
    this.muteAllOtherModules();
  }


  public onlyLevel(...level: Level[]) {
    if (this._logOnly) {
      throw '[ng2-logger] You should use funcion onlyLevel only once';
    }
    if (!this._logOnly) {
      this._logOnly = true;
    }

    this.levels = Array.isArray(level) ? level : [level];


    for (const logName in this.instances) {
      if (this.instances.hasOwnProperty(logName)) {
        const element = this.instances[logName];
        element['allowed'] = this.levels;
      }
    }
  }

  //#endregion

  private create(name: string, ...level: Level[]): Logger {
    let i: Logger;
    if (Array.isArray(this.levels) && this.levels.length > 0) {
      level = this.levels;
    }
    if (this.instances[name] === void 0) {
      i = new (Log.Logger)(
        name,
        getRandomColor(),
        this.isDevelopmentMode,
        level,
        this.isMutedModule(name),
        this.levels.length > 0 ? this.fixedWidth : void 0,
        // Log.levels.length > 0 ? Log.display : undefined,
      );
      this.instances[name] = i;
    } else {
      i = this.instances[name];
    }
    return i;
  }

  private isMutedModule(moduleName: string): boolean {
    if (this.modules.length == 0) return false;
    if (!Helpers.contain(this.modules, moduleName)) return true;
    return false;
  }
  private muteAllOtherModules() {
    for (var moduleName in this.instances) {
      if (!Helpers.contain(this.modules, moduleName))
        this.instances[moduleName].mute()
    }
  }

}


function getRandomColor(): string {
  //#region @backend
  if (Helpers.isNode) {
    return randomcolor({ luminosity: 'light', count: 10 });
  }
  //#endregion

  let letters = '012345'.split('');
  let color = '#';
  color += letters[Math.round(Math.random() * 5)];
  letters = '0123456789ABCDEF'.split('');
  for (let i = 0; i < 5; i++) {
    color += letters[Math.round(Math.random() * 15)];
  }
  if (color === void 0) {
    return getRandomColor()
  };
  return color;
}
