"use strict";
const logger_1 = require('./logger');
const level_1 = require('./level');
const display_1 = require('./display');
const include_1 = require('./include');
class Log {
    static create(name, ...level) {
        let i;
        if (Log.instances[name] === undefined) {
            i = new logger_1.Logger(name, Log.getRandomColor(), Log.isDevelopmentMode, level, Log.isMutedModule(name), Log.levels.length > 0 ? Log.display : undefined);
            Log.instances[name] = i;
        }
        else {
            i = Log.instances[name];
        }
        return i;
    }
    static getRandomColor() {
        let letters = '012345'.split('');
        let color = '#';
        color += letters[Math.round(Math.random() * 5)];
        letters = '0123456789ABCDEF'.split('');
        for (let i = 0; i < 5; i++) {
            color += letters[Math.round(Math.random() * 15)];
        }
        if (color === undefined)
            return this.getRandomColor();
        return color;
    }
    static display(name, data, incomming, moduleName) {
        if (!include_1.contain(Log.levels, incomming))
            return;
        if (incomming === level_1.Level.DATA) {
            display_1.Display.msg(name, data, name, Log.instances[moduleName].color, level_1.Level.DATA);
        }
        if (incomming === level_1.Level.ERROR) {
            display_1.Display.msg(name, data, name, Log.instances[moduleName].color, level_1.Level.ERROR);
        }
        if (incomming === level_1.Level.INFO) {
            display_1.Display.msg(name, data, name, Log.instances[moduleName].color, level_1.Level.INFO);
        }
        if (incomming === level_1.Level.WARN) {
            display_1.Display.msg(name, data, name, Log.instances[moduleName].color, level_1.Level.WARN);
        }
    }
    static onlyLevel(...level) {
        if (Log._logOnly) {
            console.error('You should use funcion onlyLevel only once');
            return;
        }
        if (Log._logOnly)
            Log._logOnly = true;
        if (level.length === 0)
            return;
        Log.levels = level;
    }
    static onlyModules(...modules) {
        if (Log._logModules) {
            console.error('You should use funcion onlyModules only once');
            return;
        }
        if (modules.length === 0)
            return;
        Log.modules = modules;
        Log.muteAllOtherModules();
    }
    static isMutedModule(moduleName) {
        if (Log.modules.length == 0)
            return false;
        if (!include_1.contain(Log.modules, moduleName))
            return true;
        return false;
    }
    static muteAllOtherModules() {
        for (var moduleName in Log.instances) {
            if (!include_1.contain(Log.modules, moduleName))
                Log.instances[moduleName].mute();
        }
    }
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
        logger_1.Logger.isProductionMode = true;
        Log.isDevelopmentMode = false;
    }
}
Log.instances = {};
Log._logOnly = false;
Log.levels = [];
Log._logModules = false;
Log.modules = [];
Log.isDevelopmentMode = true;
Log.modeIsSet = false;
exports.Log = Log;
//# sourceMappingURL=log.js.map