import { Level } from './level';
import { Display } from './display';
import { Helpers } from 'tnp-core';

export class Logger {

  private _level: Level;
  public setLevel(l: Level) {
    this._level = l;
    return this;
  }

  public get isProductionMode() {
    return !this.developmentMode;
  }

  public setProductionMode(productionMode: boolean) {
    this.developmentMode = !productionMode;
    return this;
  }

  public mute() {
    this.isMuted = true;
    return this;
  }

  constructor(
    private name: string,
    public color: string,
    private developmentMode: boolean,
    private allowed: Level[],
    private isMuted: boolean,
    public fixedWidth: number | undefined
  ) { }

  onlyWhen(expression: (() => boolean) | boolean) {
    if (typeof expression === 'function') {
      this.isMuted = !expression()
    } else if (typeof expression === 'boolean') {
      this.isMuted = !expression;
    }
  }

  private _data(name: string, ...data: any[]) {
    if (this.isMuted) return this;
    if (this.allowed.length >= 1 && Helpers.contain(this.allowed, Level.__NOTHING)
      && !Helpers.contain(this.allowed, Level.DATA)) return this;

    if (this.allowed.length === 0 || Helpers.contain(this.allowed, Level.DATA)) {
      // @ts-ignore
      Display.msg.apply(void 0, [
        name,
        ...data,
        this.name,
        this.color,
        Level.DATA,
        this.fixedWidth,
        this.isProductionMode,
      ]);
    }
    return this;
  }


  private _error(name: string, ...data: any[]) {
    if (this.isMuted) return this;
    if (this.allowed.length >= 1 && Helpers.contain(this.allowed, Level.__NOTHING)
      && !Helpers.contain(this.allowed, Level.ERROR)) return this;

    if (this.allowed.length === 0 || Helpers.contain(this.allowed, Level.ERROR)) {
      // @ts-ignore
      Display.msg.apply(void 0, [
        name,
        ...data,
        this.name,
        this.color,
        Level.ERROR,
        this.fixedWidth,
        this.isProductionMode,
      ]);
    }
    return this;
  }

  private _info(name: string, ...data: any[]) {
    if (this.isMuted) return this;
    if (this.allowed.length >= 1 && Helpers.contain(this.allowed, Level.__NOTHING)
      && !Helpers.contain(this.allowed, Level.INFO)) return this;

    if (this.allowed.length === 0 || Helpers.contain(this.allowed, Level.INFO)) {
      // @ts-ignore
      Display.msg.apply(void 0, [
        name,
        ...data,
        this.name,
        this.color,
        Level.INFO,
        this.fixedWidth,
        this.isProductionMode,
      ]);
    }
    return this;
  }

  private _success(name: string, ...data: any[]) {
    if (this.isMuted) return this;
    if (this.allowed.length >= 1 && Helpers.contain(this.allowed, Level.__NOTHING)
      && !Helpers.contain(this.allowed, Level.SUCCESS)) return this;

    if (this.allowed.length === 0 || Helpers.contain(this.allowed, Level.SUCCESS)) {
      // @ts-ignore
      Display.msg.apply(void 0, [
        name,
        ...data,
        this.name,
        this.color,
        Level.SUCCESS,
        this.fixedWidth,
        this.isProductionMode,
      ]);
    }
    return this;
  }

  private _taskStarted(name: string, ...data: any[]) {
    if (this.isMuted) return this;
    if (this.allowed.length >= 1 && Helpers.contain(this.allowed, Level.__NOTHING)
      && !Helpers.contain(this.allowed, Level.TASK_STARTED)) return this;

    if (this.allowed.length === 0 || Helpers.contain(this.allowed, Level.TASK_STARTED)) {
      // @ts-ignore
      Display.msg.apply(void 0, [
        name,
        ...data,
        this.name,
        this.color,
        Level.TASK_STARTED,
        this.fixedWidth,
        this.isProductionMode,
      ]);
    }
    return this;
  }

  private _taskDone(name: string, ...data: any[]) {
    if (this.isMuted) return this;
    if (this.allowed.length >= 1 && Helpers.contain(this.allowed, Level.__NOTHING)
      && !Helpers.contain(this.allowed, Level.TASK_DONE)) return this;

    if (this.allowed.length === 0 || Helpers.contain(this.allowed, Level.TASK_DONE)) {
      // @ts-ignore
      Display.msg.apply(void 0, [
        name,
        ...data,
        this.name,
        this.color,
        Level.TASK_DONE,
        this.fixedWidth,
        this.isProductionMode,
      ]);
    }
    return this;
  }

  private _warn(name: string, ...data: any[]) {
    if (this.isMuted) return this;
    if (this.allowed.length >= 1 && Helpers.contain(this.allowed, Level.__NOTHING)
      && !Helpers.contain(this.allowed, Level.WARN)) return this;

    if (this.allowed.length === 0 || Helpers.contain(this.allowed, Level.WARN)) {
      // @ts-ignore
      Display.msg.apply(void 0, [
        name,
        ...data,
        this.name,
        this.color,
        Level.WARN,
        this.fixedWidth,
        this.isProductionMode,
      ])
    }
    return this;
  }


  /** @deprecated Use data(...)
   * @see data
  */
  d = (name: string | any, ...data: any[]) => this._data(name, data);

  /** @deprecated Use error(...)
   * @see error
  */

  er = (name: string | any, ...data: any[]) => this._error(name, data);

  /** @deprecated Use info(...)
   * @see info
  */
  i = (name: string | any, ...data: any[]) => this._info(name, data);

  /** @deprecated Use warn(...)
   * @see warn
  */
  w = (name: string | any, ...data: any[]) => this._warn(name, data);

  /**
   * Logs message and data with the level=data
   * @param message The message
   * @param otherParams Additional parameters
   */
  data = (message: string, ...otherParams: any[]) => { return this._data(message, otherParams); };

  /**
   * Logs message and data with the level=error
   * @param message The message
   * @param otherParams Additional parameters
   */
  error = (message: string, ...otherParams: any[]) => this._error(message, otherParams);

  /**
   * Logs message and data with the level=info
   * @param message The message
   * @param otherParams Additional parameters
   */
  info = (message: string, ...otherParams: any[]) => this._info(message, otherParams);

  /**
   * Logs message and data with the level=success
   * @param message The message
   * @param otherParams Additional parameters
   */
  success = (message: string, ...otherParams: any[]) => this._success(message, otherParams);


  /**
  * Logs message and data with the level=taskStarted
  * @param message The message
  * @param otherParams Additional parameters
  */
  taskStarted = (message: string, ...otherParams: any[]) => this._taskStarted(message, otherParams);

  /**
  * Logs message and data with the level=taskDone
  * @param message The message
  * @param otherParams Additional parameters
  */
  taskDone = (message?: string, ...otherParams: any[]) => this._taskDone(message, otherParams);

  /**
   * Logs message and data with the level=warn
   * @param message The message
   * @param otherParams Additional parameters
   */
  warn = (message: string, ...otherParams: any[]) => this._warn(message, otherParams);

}
