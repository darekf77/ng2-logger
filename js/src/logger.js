"use strict";
var level_1 = require('./level');
var display_1 = require('./display');
var include_1 = require('./include');
var Logger = (function () {
    function Logger(name, color, display, developmentMode, allowed) {
        this.name = name;
        this.color = color;
        this.display = display;
        this.developmentMode = developmentMode;
        this.allowed = allowed;
        this._level = undefined;
    }
    Logger.prototype.d = function (name) {
        var data = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            data[_i - 1] = arguments[_i];
        }
        if (this.allowed.length >= 1 && include_1.contain(this.allowed, level_1.Level.__NOTHING)
            && !include_1.contain(this.allowed, level_1.Level.DATA))
            return this;
        if (Logger.isProductionMode)
            return this;
        if (this.display !== undefined)
            this.display(name, data, level_1.Level.DATA, this.name);
        else if (this.allowed.length === 0 || include_1.contain(this.allowed, level_1.Level.DATA)) {
            display_1.Display.msg(name, data, this.name, this.color, level_1.Level.DATA);
        }
        return this;
    };
    Logger.prototype.er = function (name) {
        var data = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            data[_i - 1] = arguments[_i];
        }
        if (this.allowed.length >= 1 && include_1.contain(this.allowed, level_1.Level.__NOTHING)
            && !include_1.contain(this.allowed, level_1.Level.ERROR))
            return this;
        if (Logger.isProductionMode)
            return this;
        if (this.display !== undefined)
            this.display(name, data, level_1.Level.ERROR, this.name);
        else if (this.allowed.length === 0 || include_1.contain(this.allowed, level_1.Level.ERROR)) {
            display_1.Display.msg(name, data, this.name, this.color, level_1.Level.ERROR);
        }
        return this;
    };
    Logger.prototype.i = function (name) {
        var data = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            data[_i - 1] = arguments[_i];
        }
        if (this.allowed.length >= 1 && include_1.contain(this.allowed, level_1.Level.__NOTHING)
            && !include_1.contain(this.allowed, level_1.Level.INFO))
            return this;
        if (Logger.isProductionMode)
            return this;
        if (this.display !== undefined)
            this.display(name, data, level_1.Level.INFO, this.name);
        else if (this.allowed.length === 0 || include_1.contain(this.allowed, level_1.Level.INFO)) {
            display_1.Display.msg(name, data, this.name, this.color, level_1.Level.INFO);
        }
        return this;
    };
    Logger.prototype.w = function (name) {
        var data = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            data[_i - 1] = arguments[_i];
        }
        if (this.allowed.length >= 1 && include_1.contain(this.allowed, level_1.Level.__NOTHING)
            && !include_1.contain(this.allowed, level_1.Level.WARN))
            return this;
        if (Logger.isProductionMode)
            return this;
        if (this.display !== undefined)
            this.display(name, data, level_1.Level.WARN, this.name);
        else if (this.allowed.length === 0 || include_1.contain(this.allowed, level_1.Level.WARN)) {
            display_1.Display.msg(name, data, this.name, this.color, level_1.Level.WARN);
        }
        return this;
    };
    Logger.prototype.level = function (l) {
        this._level = l;
        return this;
    };
    Logger.isProductionMode = false;
    return Logger;
}());
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map