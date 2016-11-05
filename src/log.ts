import { Logger } from './logger';
import { Level } from './level';
import { Display } from './display';

import { contain } from './include';

export class Log {

    private static instances = {};

    static create<TA>(name: string, ...level: Level[]): Logger<TA> {
        let i: Logger<TA>;
        if (Log.instances[name] === undefined) {
            i = new Logger<TA>(
                name,
                Log.getRandomColor(),
                Log.levels.length > 0 ? Log.display : undefined,
                Log.isDevelopmentMode,
                level,
                Log.isMutedModule(name)
            );
            Log.instances[name] = i;
        } else {
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
        if (!contain(Log.levels, incomming)) return;
        if (incomming === Level.DATA) {
            Display.msg(name, data, name, Log.instances[moduleName].color, Level.DATA);
        }
        if (incomming === Level.ERROR) {
            Display.msg(name, data, name, Log.instances[moduleName].color, Level.ERROR);
        }
        if (incomming === Level.INFO) {
            Display.msg(name, data, name, Log.instances[moduleName].color, Level.INFO);
        }
        if (incomming === Level.WARN) {
            Display.msg(name, data, name, Log.instances[moduleName].color, Level.WARN);
        }
    }

    private static _logOnly = false;
    private static levels: Level[] = [];
    static onlyLevel(...level: Level[]) {
        if (Log._logOnly) {
            console.error('You should use funcion onlyLevel only once');
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
            console.error('You should use funcion onlyModules only once');
            return;
        }
        if (modules.length === 0) return;
        Log.modules = modules;
        Log.muteAllOtherModules();
    }
    private static isMutedModule(moduleName:string):boolean {
        if(Log.modules.length == 0) return false;
        if(!contain(Log.modules, moduleName)) return true;
        return false;
    }
    private static muteAllOtherModules() {
        for (var moduleName in Log.instances) {
            if(!contain(Log.modules, moduleName))
                Log.instances[moduleName].mute()
        }
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
