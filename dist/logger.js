"use strict";
const level_1 = require('./level');
const display_1 = require('./display');
const include_1 = require('./include');
class Logger {
    constructor(name, color, developmentMode, allowed, isMuted, display) {
        this.name = name;
        this.color = color;
        this.developmentMode = developmentMode;
        this.allowed = allowed;
        this.isMuted = isMuted;
        this.display = display;
    }
    d(name, ...data) {
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
    }
    er(name, ...data) {
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
    }
    i(name, ...data) {
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
    }
    w(name, ...data) {
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
    }
    _logMessage(name, level, ...data) {
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
    }
    level(l) {
        this._level = l;
        return this;
    }
    mute() {
        this.isMuted = true;
    }
}
Logger.isProductionMode = false;
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map