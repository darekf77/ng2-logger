"use strict";
var level_1 = require('./level');
var display_1 = require('./display');
var include_1 = require('./include');
var Logger = (function () {
    function Logger(name, color, display, developmentMode, allowed, isMuted) {
        this.name = name;
        this.color = color;
        this.display = display;
        this.developmentMode = developmentMode;
        this.allowed = allowed;
        this.isMuted = isMuted;
        this._level = undefined;
    }
    Logger.prototype.d = function (name) {
        var data = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            data[_i - 1] = arguments[_i];
        }
        return this._logMessage.apply(this, [name, level_1.Level.DATA].concat(data));
    };
    Logger.prototype.er = function (name) {
        var data = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            data[_i - 1] = arguments[_i];
        }
        return this._logMessage.apply(this, [name, level_1.Level.INFO].concat(data));
    };
    Logger.prototype.i = function (name) {
        var data = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            data[_i - 1] = arguments[_i];
        }
        return this._logMessage.apply(this, [name, level_1.Level.ERROR].concat(data));
    };
    Logger.prototype.w = function (name) {
        var data = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            data[_i - 1] = arguments[_i];
        }
        return this._logMessage.apply(this, [name, level_1.Level.WARN].concat(data));
    };
    Logger.prototype._logMessage = function (name, level) {
        var data = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            data[_i - 2] = arguments[_i];
        }
        if (this.isMuted)
            return this;
        if (this.allowed.length >= 1 && include_1.contain(this.allowed, level)
            && !include_1.contain(this.allowed, level))
            return this;
        if (Logger.isProductionMode)
            return this;
        if (this.display !== undefined)
            this.display(name, data, level, this.name);
        else if (this.allowed.length === 0 || include_1.contain(this.allowed, level)) {
            display_1.Display.msg(name, data, this.name, this.color, level);
        }
        return this;
    };
    Logger.prototype.level = function (l) {
        this._level = l;
        return this;
    };
    Logger.prototype.mute = function () {
        this.isMuted = true;
    };
    Logger.isProductionMode = false;
    return Logger;
}());
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map