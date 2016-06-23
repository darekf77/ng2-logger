import { Logger } from './logger';
import { Level } from './level';
import { Display } from './display';

export class Log {



    private static instances = {};

    static create<TA>(name: string, ...level: Level[]): Logger<TA> {
        // if (Log.instances[name] !== undefined) return Log.instances[name];
        if (Log.modules.length > 0 && !Log.modules.includes(name)) return;
        let i: Logger<TA>;
        if (Log.instances[name] === undefined) {
            i = new Logger<TA>(
                name,
                Log.getRandomColor(),
                Log.levels.length > 0 ? Log.display : undefined,
                Log.isDevelopmentMode,
                level
            );
        }
        else {
            i = Log.instances[name];
        }
        return i;
    }

    private static getRandomColor() {
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
        if (!Log.levels.includes(incomming)) return;
        if (incomming === Level.DATA) {
            Display.msg(name, data, this.name, Log.instances[moduleName].color, Level.DATA);
        }
        if (incomming === Level.ERROR) {
            Display.msg(name, data, this.name, Log.instances[moduleName].color, Level.ERROR);
        }
        if (incomming === Level.INFO) {
            Display.msg(name, data, this.name, Log.instances[moduleName].color, Level.INFO);
        }
        if (incomming === Level.WARN) {
            Display.msg(name, data, this.name, Log.instances[moduleName].color, Level.WARN);
        }
    }

    private static _logOnly = false;
    private static levels: Level[] = [];
    static onlyLevel(...level: Level[]) {
        if (Log._logOnly) {
            console.error('You should use funcion onlyLevel only onec');
            return;
        }
        if (Log._logOnly) Log._logOnly = true;
        if (level.length === 0) return;
        Log.levels = level;
    }

    private static _logModules = false;
    private static modules: string[] = [];
    static onlyModules(...modules: string[]) {
        if (Log._logModules) {
            console.error('You should use funcion onlyModules only onec');
            return;
        }
        if (modules.length === 0) return;
        Log.modules = modules;
    }


    private static isDevelopmentMode = true;
    private static modeIsSet: boolean = false;
    static setProductionMode() {
        if (Log.modeIsSet) {
            console.error('Mode is already set');
            return;
        }
        if (console !== undefined && console.clear !== undefined) {
            setTimeout(() => {
                console.clear();
                console.log = () => { };
                console.error = () => { };
                console.warn = () => { };
                console.info = () => { };
            });
        }
        Logger.isProductionMode = true;
        Log.isDevelopmentMode = false;
    }
}
