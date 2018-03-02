import { Level } from './level';
import { Display } from './display';

import { contain } from './include';

export class Logger<T> {
  constructor(
    private name: string,
    public color: string,
    private developmentMode: boolean,
    private allowed: Level[],
    private isMuted: boolean,
    public fixedWidth: number | undefined,
    private display?: (
      name: string,
      data: any,
      leve: Level,
      moduleName: string
    ) => void
  ) {}

  private _data(name: string, ...data: any[]) {
    if (
      this.allowed.length >= 1 &&
      contain(this.allowed, Level.__NOTHING) &&
      !contain(this.allowed, Level.DATA)
    )
      return this;
    if (Logger.isProductionMode) return this;
    if (this.display !== undefined)
      this.display(name, data, Level.DATA, this.name);
    else if (this.allowed.length === 0 || contain(this.allowed, Level.DATA)) {
      Display.msg.apply(undefined, [
        name,
        ...data,
        this.name,
        this.color,
        Level.DATA,
        this.fixedWidth
      ]);
    }
    return this;
  }

  private _error(name: string, ...data: any[]) {
    if (
      this.allowed.length >= 1 &&
      contain(this.allowed, Level.__NOTHING) &&
      !contain(this.allowed, Level.ERROR)
    )
      return this;
    if (Logger.isProductionMode) return this;
    if (this.display !== undefined)
      this.display(name, data, Level.ERROR, this.name);
    else if (this.allowed.length === 0 || contain(this.allowed, Level.ERROR)) {
      Display.msg.apply(undefined, [
        name,
        ...data,
        this.name,
        this.color,
        Level.ERROR,
        this.fixedWidth
      ]);
    }
    return this;
  }

  private _info(name: string, ...data: any[]) {
    if (
      this.allowed.length >= 1 &&
      contain(this.allowed, Level.__NOTHING) &&
      !contain(this.allowed, Level.INFO)
    )
      return this;
    if (Logger.isProductionMode) return this;
    if (this.display !== undefined)
      this.display(name, data, Level.INFO, this.name);
    else if (this.allowed.length === 0 || contain(this.allowed, Level.INFO)) {
      Display.msg.apply(undefined, [
        name,
        ...data,
        this.name,
        this.color,
        Level.INFO,
        this.fixedWidth
      ]);
    }
    return this;
  }

  private _warn(name: string, ...data: any[]) {
    if (
      this.allowed.length >= 1 &&
      contain(this.allowed, Level.__NOTHING) &&
      !contain(this.allowed, Level.WARN)
    )
      return this;
    if (Logger.isProductionMode) return this;
    if (this.display !== undefined)
      this.display(name, data, Level.WARN, this.name);
    else if (this.allowed.length === 0 || contain(this.allowed, Level.WARN)) {
      Display.msg.apply(undefined, [
        name,
        ...data,
        this.name,
        this.color,
        Level.WARN,
        this.fixedWidth
      ]);
    }
    return this;
  }

  /** @deprecated Use data(...)
   * @see data
   */
  d = (name: string, ...data: any[]) => this._data(name, data);

  /** @deprecated Use error(...)
   * @see error
   */

  er = (name: string, ...data: any[]) => this._error(name, data);

  /** @deprecated Use info(...)
   * @see info
   */
  i = (name: string, ...data: any[]) => this._info(name, data);

  /** @deprecated Use warn(...)
   * @see warn
   */
  w = (name: string, ...data: any[]) => this._warn(name, data);

  /**
   * Logs message and data with the level=data
   * @param message The message
   * @param otherParams Additional parameters
   */
  data = (message: string, ...otherParams: any[]): Logger<T> => {
    return this._data(message, otherParams);
  };

  /**
   * Logs message and data with the level=error
   * @param message The message
   * @param otherParams Additional parameters
   */
  error = (message: string, ...otherParams: any[]) =>
    this._error(message, otherParams);

  /**
   * Logs message and data with the level=info
   * @param message The message
   * @param otherParams Additional parameters
   */
  info = (message: string, ...otherParams: any[]) =>
    this._info(message, otherParams);

  /**
   * Logs message and data with the level=warn
   * @param message The message
   * @param otherParams Additional parameters
   */
  warn = (message: string, ...otherParams: any[]) =>
    this._warn(message, otherParams);

  private _logMessage(name: string, level: Level, ...data: any[]) {
    if (this.isMuted) return this;
    if (
      this.allowed.length >= 1 &&
      contain(this.allowed, level) &&
      !contain(this.allowed, level)
    )
      return this;
    if (Logger.isProductionMode) return this;
    if (this.display !== undefined) this.display(name, data, level, this.name);
    else if (this.allowed.length === 0 || contain(this.allowed, level)) {
      Display.msg(name, data, this.name, this.color, level, this.fixedWidth);
    }
    return this;
  }

  private _level: Level;
  private level(l: Level) {
    this._level = l;
    return this;
  }

  public static isProductionMode: boolean = false;

  public mute() {
    this.isMuted = true;
  }
}
