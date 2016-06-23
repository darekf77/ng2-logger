import { Level } from './level';
import { Display } from './display';

export class Logger<T> {

    constructor(
        private name: string,
        public color: string,
        private display: (name: string, data: any, leve: Level, moduleName: string) => void,
        private developmentMode: boolean,
        private allowed: Level[]) {
    }

    d(name: string, ...data: any[]) {
        if (Logger.isProductionMode) return this;
        if (this.display !== undefined) this.display(name, data, Level.DATA, this.name);
        else if (this.allowed.length === 0 || this.allowed.includes(Level.DATA)) {
            Display.msg(name, data, this.name, this.color, Level.DATA);
        }
        return this;
    }

    er(name: string, ...data: any[]) {
        if (Logger.isProductionMode) return this;
        if (this.display !== undefined) this.display(name, data, Level.ERROR, this.name);
        else if (this.allowed.length === 0 || this.allowed.includes(Level.ERROR)) {
            Display.msg(name, data, this.name, this.color, Level.ERROR);
        }
        return this;
    }

    i(name: string, ...data: any[]) {
        if (Logger.isProductionMode) return this;
        if (this.display !== undefined) this.display(name, data, Level.INFO, this.name);
        else if (this.allowed.length === 0 || this.allowed.includes(Level.INFO)) {
            Display.msg(name, data, this.name, this.color, Level.INFO);
        }
        return this;
    }

    w(name: string, ...data: any[]) {
        if (Logger.isProductionMode) return this;
        if (this.display !== undefined) this.display(name, data, Level.WARN, this.name);
        else if (this.allowed.length === 0 || this.allowed.includes(Level.WARN)) {
            Display.msg(name, data, this.name, this.color, Level.WARN);
        }
        return this;
    }

    private _level: Level = undefined;
    private level(l: Level) {
        this._level = l;
        return this;
    }

    public static isProductionMode: boolean = false;


}
