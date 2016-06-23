import { Level } from './level';

export class Logger<T> {

    static instances = {};
    constructor(
        private name: string,
        private display: (name: string, data: any, leve: Level, moduleName: string) => void,
        private developmentMode: boolean,
        private allowed: Level[]) {
        Logger.instances[name] = this;
    }

    d(name: string, ...data: any[]) {
        if (Logger.isProductionMode) return this;
        if (this.display !== undefined) this.display(name,data,Level.DATA,this.name);
        else if( this.allowed.length == 0 || this.allowed.includes(Level.DATA) ) {
            console.log(name, data);
        }
        return this;
    }

    er(name: string, ...data: any[]) {
        if (Logger.isProductionMode) return this;
        if (this.display !== undefined)  this.display(name,data,Level.ERROR,this.name);
        else if( this.allowed.length == 0 || this.allowed.includes(Level.ERROR)) {
            console.error(name, data);
        }
        return this;
    }

    i(name: string, ...data: any[]) {
        if (Logger.isProductionMode) return this;
        if (this.display !== undefined)  this.display(name,data,Level.INFO,this.name);
       else if( this.allowed.length == 0 || this.allowed.includes(Level.INFO)) {
            console.info(name, data);
        }
        return this;
    }

    w(name: string, ...data: any[]) {
        if (Logger.isProductionMode) return this;
        if (this.display !== undefined)  this.display(name,data,Level.WARN,this.name);
        else if( this.allowed.length == 0 || this.allowed.includes(Level.WARN)) {
            console.warn(name, data);
        }
        return this;
    }

    debugger(o: Object, stateName: string = 'debugger' ) {
        if (Logger.isProductionMode) return this;
        console.groupCollapsed(name)
        for(let p in o ) {
            if(o.hasOwnProperty(p)) {
                console.debug(p,o[p])
            }            
        }
        console.groupEnd();
        return this;
    }


    private _level: Level = undefined;
    private level(l: Level) {
        this._level = l;
        return this;
    }

    public static isProductionMode: boolean = false;


}
