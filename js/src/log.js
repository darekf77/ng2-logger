"use strict";
var logger_1 = require('./logger');
var level_1 = require('./level');
var display_1 = require('./display');
var include_1 = require('./include');
var Log = (function () {
    function Log() {
    }
    Log.create = function (name) {
        var level = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            level[_i - 1] = arguments[_i];
        }
        var i;
        if (Log.instances[name] === undefined) {
            i = new logger_1.Logger(name, Log.getRandomColor(), Log.levels.length > 0 ? Log.display : undefined, Log.isDevelopmentMode, level, Log.isMutedModule(name));
            Log.instances[name] = i;
        }
        else {
            i = Log.instances[name];
        }
        return i;
    };
    Log.getRandomColor = function () {
        var letters = '012345'.split('');
        var color = '#';
        color += letters[Math.round(Math.random() * 5)];
        letters = '0123456789ABCDEF'.split('');
        for (var i = 0; i < 5; i++) {
            color += letters[Math.round(Math.random() * 15)];
        }
        if (color === undefined)
            return this.getRandomColor();
        return color;
    };
    Log.display = function (name, data, incomming, moduleName) {
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
    };
    Log.onlyLevel = function () {
        var level = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            level[_i - 0] = arguments[_i];
        }
        if (Log._logOnly) {
            console.error('You should use funcion onlyLevel only once');
            return;
        }
        if (Log._logOnly)
            Log._logOnly = true;
        if (level.length === 0)
            return;
        Log.levels = level;
    };
    Log.onlyModules = function () {
        var modules = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            modules[_i - 0] = arguments[_i];
        }
        if (Log._logModules) {
            console.error('You should use funcion onlyModules only once');
            return;
        }
        if (modules.length === 0)
            return;
        Log.modules = modules;
        Log.muteAllOtherModules();
    };
    Log.isMutedModule = function (moduleName) {
        if (Log.modules.length == 0)
            return false;
        if (!include_1.contain(Log.modules, moduleName))
            return true;
        return false;
    };
    Log.muteAllOtherModules = function () {
        for (var moduleName in Log.instances) {
            if (!include_1.contain(Log.modules, moduleName))
                Log.instances[moduleName].mute();
        }
    };
    Log.setProductionMode = function () {
        if (Log.modeIsSet) {
            console.error('Mode is already set');
            return;
        }
        if (console !== undefined && console.clear !== undefined) {
            setTimeout(function () {
                console.clear();
                console.log = function () { };
                console.error = function () { };
                console.warn = function () { };
                console.info = function () { };
            });
        }
        logger_1.Logger.isProductionMode = true;
        Log.isDevelopmentMode = false;
    };
    Log.instances = {};
    Log._logOnly = false;
    Log.levels = [];
    Log._logModules = false;
    Log.modules = [];
    Log.isDevelopmentMode = true;
    Log.modeIsSet = false;
    return Log;
}());
exports.Log = Log;
//# sourceMappingURL=log.js.map