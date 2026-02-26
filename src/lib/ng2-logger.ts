//#region imports
import chalk from 'chalk'; // @backend
import * as stringify from 'json-stringify-safe';
import { Helpers, json5, UtilsOs } from 'tnp-core/src';

//#region @backend
const randomcolor = require('randomcolor').default ?? require('randomcolor');
//#endregion
//#endregion

//#region level
export enum Level {
  DATA,
  INFO,
  WARN,
  ERROR,
  SUCCESS,
  TASK_STARTED,
  TASK_DONE,
}
//#endregion

//#region constants
export const LevelKey = {
  [Level.DATA]: 'data',
  [Level.INFO]: 'info',
  [Level.WARN]: 'warn',
  [Level.ERROR]: 'error',
  [Level.SUCCESS]: 'success',
  [Level.TASK_STARTED]: 'taskstarted',
  [Level.TASK_DONE]: 'taskdone',
};

export const LevelOrder = [
  LevelKey[Level.DATA],
  LevelKey[Level.TASK_STARTED],
  LevelKey[Level.TASK_DONE],
  LevelKey[Level.INFO],
  LevelKey[Level.SUCCESS],
  LevelKey[Level.WARN],
  LevelKey[Level.ERROR],
];

const levelIcon = {
  [Level.INFO]: 'ℹ️',
  [Level.ERROR]: '❌',
  [Level.WARN]: '⚠️',
  [Level.SUCCESS]: '✅',
  [Level.TASK_STARTED]: '🚀',
  [Level.TASK_DONE]: '🏁',
  [Level.DATA]: '',
};

//#endregion

//#region log namespace
export namespace Log {
  //#region internal state

  const instances = new Map<string, Logger>();

  let originalConsole: Partial<typeof console> | null = null;
  let permanentlyDisabled = false;

  const consoleMethods = ['log', 'info', 'warn', 'error'] as const;

  let globalLevel: Level | null = null;

  //#endregion

  //#region settings

  export const settings = {
    mutedModules: [] as string[],
    showTimestamp: false,
  };

  //#endregion

  //#region helpers

  const isMutedModule = (moduleName: string): boolean => {
    if (settings.mutedModules.length === 0) return false;
    return !Helpers.contain(settings.mutedModules, moduleName);
  };

  //#endregion

  //#region public api

  export const create = (moduleName: string, ...level: Level[]): Logger => {
    const log = new Logger(
      moduleName,
      getRandomColor(),
      level,
      isMutedModule(moduleName),
      undefined,
    );

    instances.set(moduleName, log);
    return log;
  };

  export const setGlobalLevel = (level: Level) => {
    globalLevel = level;
  };

  export const onlyLevel = (...levels: Level[]): void => {
    instances.forEach(instance => {
      instance.allowed = levels;
    });
  };

  export const onlyModules = (...modules: (string | RegExp)[]): void => {
    instances.forEach(instance => {
      const moduleName = instance.moduleName;

      const isAllowed = modules.some(m => {
        if (typeof m === 'string') {
          return m === moduleName;
        }
        if (m instanceof RegExp) {
          return m.test(moduleName);
        }
        return false;
      });

      // mute if NOT allowed
      instance.isMuted = !isAllowed;
    });
  };

  export const disableAllLogsPermanetly = () => {
    if (permanentlyDisabled) return;

    if (!originalConsole) {
      originalConsole = {};
      consoleMethods.forEach(m => {
        originalConsole![m] = console[m];
      });
    }

    consoleMethods.forEach(m => {
      console[m] = () => {};
    });

    permanentlyDisabled = true;
  };

  export const disableAllLogs = () => {
    if (permanentlyDisabled) return;

    if (!originalConsole) {
      originalConsole = {};
      consoleMethods.forEach(m => {
        originalConsole![m] = console[m];
      });
    }

    consoleMethods.forEach(m => {
      console[m] = () => {};
    });
  };

  export const enableAllLogs = () => {
    if (permanentlyDisabled) return;
    if (!originalConsole) return;

    consoleMethods.forEach(m => {
      if (originalConsole && originalConsole[m]) {
        console[m] = originalConsole[m] as any;
      }
    });
  };

  //#endregion

  //#region logger class

  class Logger {
    constructor(
      public readonly moduleName: string,
      public color: string,
      public allowed: Level[],
      public isMuted: boolean,
      /**
       * Set how much characters in terminal/console
       * your module name should take
       */
      public moduleWidth: number | undefined,
    ) {
      this.createLevelMethod(Level.DATA);
      this.createLevelMethod(Level.DATA, 'd');
      this.createLevelMethod(Level.INFO);
      this.createLevelMethod(Level.INFO, 'i');
      this.createLevelMethod(Level.WARN);
      this.createLevelMethod(Level.WARN, 'w');
      this.createLevelMethod(Level.ERROR);
      this.createLevelMethod(Level.ERROR, 'er');
      this.createLevelMethod(Level.SUCCESS);
      this.createLevelMethod(Level.TASK_STARTED);
      this.createLevelMethod(Level.TASK_DONE);
    }

    declare data: (message: string, ...data: any[]) => void;

    declare d: (message: string, ...data: any[]) => void;

    declare info: (message: string, ...data: any[]) => void;

    declare i: (message: string, ...data: any[]) => void;

    declare warn: (message: string, ...data: any[]) => void;

    declare w: (message: string, ...data: any[]) => void;

    declare error: (message: string, ...data: any[]) => void;

    declare er: (message: string, ...data: any[]) => void;

    public setLevel(l: Level) {
      this.allowed = [l];
      return this;
    }

    public mute() {
      this.isMuted = true;
      return this;
    }

    public logOnlyWhen(expression: (() => boolean) | boolean): void {
      this.isMuted =
        typeof expression === 'function' ? !expression() : !expression;
    }

    private createLevelMethod(level: Level, overrideMethodName?: string) {
      const methodName = overrideMethodName
        ? overrideMethodName
        : LevelKey[level];

      (this as any)[methodName] = (message: string, ...data: any[]) => {
        if (this.isMuted) return this;

        if (globalLevel !== null && level < globalLevel) {
          return this;
        }

        if (this.allowed.length === 0 || Helpers.contain(this.allowed, level)) {
          displayMsg(
            message,
            data.length === 0 ? undefined : data,
            this.moduleName,
            this.color,
            level,
            this.moduleWidth,
            permanentlyDisabled,
          );
        }

        return this;
      };
    }
  }

  //#endregion
}
//#endregion

//#region get random color
const getRandomColor = (): string => {
  //#region @backend
  if (UtilsOs.isNode) {
    return randomcolor({ luminosity: 'light' });
  }
  //#endregion

  const letters = '0123456789ABCDEF';
  return (
    '#' +
    Array.from({ length: 6 })
      .map(() => letters[Math.floor(Math.random() * 16)])
      .join('')
  );
};
//#endregion

//#region console log
const consoleLog = (data: string, level: Level): void => {
  //#region @backend
  if (level === Level.INFO) Helpers.info(data);
  else if (level === Level.ERROR) Helpers.error(data, true, true);
  else if (level === Level.WARN) Helpers.warn(data, false);
  else if (level === Level.SUCCESS) Helpers.success(data);
  else if (level === Level.TASK_STARTED) Helpers.taskStarted(data);
  else if (level === Level.TASK_DONE) Helpers.taskDone(data);
  else Helpers.log(data, 0, true);
  //#endregion
};
//#endregion

//#region display message
const displayMsg = (
  message: string,
  params: any[] | undefined,
  moduleName: string,
  moduleColor: string,
  level: Level,
  moduleWidth: number | undefined,
  permanentlyDisabled: boolean,
): void => {
  if (permanentlyDisabled) return;

  if (message) {
    message = `${levelIcon[level]}  ${message?.toString()}`;
  } else {
    message = levelIcon[level];
  }

  const timestamp = Log.settings.showTimestamp
    ? `[${new Date().toISOString()}] `
    : '';

  if (moduleWidth) {
    const diff = moduleWidth - moduleName.length;
    if (diff > 0) {
      for (let i = 0; i < diff; i++) {
        moduleName += ' ';
      }
    }
  }

  //#region @browser
  if (UtilsOs.isBrowser) {
    let levelColor = 'gray';

    switch (level) {
      case Level.INFO:
        levelColor = 'deepskyblue';
        break;
      case Level.WARN:
        levelColor = 'orange';
        break;
      case Level.ERROR:
        levelColor = 'red';
        break;
      case Level.SUCCESS:
        levelColor = 'green';
        break;
      case Level.TASK_STARTED:
        levelColor = 'purple';
        break;
      case Level.TASK_DONE:
        levelColor = 'mediumseagreen';
        break;
      case Level.DATA:
      default:
        levelColor = 'gray';
    }

    const moduleStyle = `background:${moduleColor};color:white;padding:2px 4px;border-radius:2px;`;

    const messageStyle = `color:${levelColor};font-weight:${level === Level.ERROR ? 'bold' : 'normal'};`;

    console.log(
      `%c ${moduleName} %c ${timestamp}${message}`,
      moduleStyle,
      messageStyle,
      ...(params ?? []),
    );
  }
  //#endregion

  //#region @backend
  if (UtilsOs.isNode) {
    const header =
      chalk.bgHex(moduleColor)(chalk.black(moduleName)) +
      ' ' +
      chalk.dim(timestamp + message);

    consoleLog(header, level);

    if (params) {
      params.forEach(p => consoleLog(stringify(p, null, 2), level));
    }
  }
  //#endregion
};
//#endregion
