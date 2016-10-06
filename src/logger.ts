import { Level } from './level';
import { Display } from './display';

import { contain } from './include';

export class Logger<T> {

    constructor(
        private name: string,
        public color: string,
        private display: (name: string, data: any, leve: Level, moduleName: string) => void,
        private developmentMode: boolean,
        private allowed: Level[],
        private isMuted) {
    }

    d(name: string, ...data: any[]) {
        return this._logMessage(name, Level.DATA, data);
    }

    er(name: string, ...data: any[]) {
        return this._logMessage(name, Level.INFO, data);
    }

    i(name: string, ...data: any[]) {
        return this._logMessage(name, Level.ERROR, data);
    }

    w(name: string, ...data: any[]) {
        return this._logMessage(name, Level.WARN, data);
    }

    private _logMessage(name:string, level:Level, ...data:any[])
    {
        if (this.isMuted) return this;
        if (this.allowed.length >= 1 && contain(this.allowed, level)
            && !contain(this.allowed, level)) return this;
        if (Logger.isProductionMode) return this;
        if (this.display !== undefined) this.display(name, data, level, this.name);
        else if (this.allowed.length === 0 || contain(this.allowed, level)) {
            Display.msg(name, data, this.name, this.color, level);
        }
        return this;
    }

    private _level: Level = undefined;
    private level(l: Level) {
        this._level = l;
        return this;
    }

    public static isProductionMode: boolean = false;

    public mute() {
        this.isMuted = true;
    }


}
