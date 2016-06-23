import { Logger } from './logger';
import { Level } from './level';

export class Log {



    private static instances = {};

    static create<TA>(name: string, ...level: Level[]): Logger<TA> {
        // if (Log.instances[name] !== undefined) return Log.instances[name];
        if (Log.modules.length > 0 && !Log.modules.includes(name)) return;
        let i: Logger<TA>;
        if (Log.instances[name] === undefined) {
            i = new Logger<TA>(
                name,
                Log.levels.length > 0 ? Log.display : undefined,
                Log.isDevelopmentMode,
                level
            );
        }
        else {
            i = Log.instances[name];
        }
        console.groupEnd();
        console.group(name);
        Log.instances = Logger.instances;
        return i;
    }

    private static display(name: string, data: any, incomming: Level, moduleName: string) {
        if (!Log.levels.includes(incomming)) return;
        if (incomming === Level.DATA) console.log(name, data);
        if (incomming === Level.ERROR) console.error(name, data);
        if (incomming === Level.INFO) console.info(name, data);
        if (incomming === Level.WARN) console.warn(name, data);
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

                console.clear()
            });
        }
        Logger.isProductionMode = true;
        Log.isDevelopmentMode = false;
    }
}
