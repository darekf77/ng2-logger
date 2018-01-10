(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Level;
(function (Level) {
    Level[Level["DATA"] = 0] = "DATA";
    Level[Level["INFO"] = 1] = "INFO";
    Level[Level["WARN"] = 2] = "WARN";
    Level[Level["ERROR"] = 3] = "ERROR";
    Level[Level["__NOTHING"] = 4] = "__NOTHING";
})(Level = exports.Level || (exports.Level = {}));


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.isBrowser = (typeof window !== 'undefined' && window.document);
exports.isNode = !exports.isBrowser;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const level_1 = __webpack_require__(0);
const helper_1 = __webpack_require__(1);
const backend_logging_1 = __webpack_require__(7);
if (helper_1.isNode) {
}
class Display {
    static msg(message, params, moduleName, moduleColor, level, moduleWidth) {
        let color = 'gray';
        if (level === level_1.Level.INFO)
            color = 'deepskyblue';
        if (level === level_1.Level.ERROR)
            color = 'red';
        if (level === level_1.Level.WARN)
            color = 'orange';
        if (moduleWidth) {
            const diff = moduleWidth - moduleName.length;
            if (diff > 0) {
                for (let i = 0; i < diff; i++) {
                    moduleName += ' ';
                }
            }
        }
        if (helper_1.isBrowser) {
            if (typeof message === 'string') {
                let a1 = '%c ' + moduleName + '  %c ' + message + ' ';
                let a2 = 'background: ' + moduleColor + ';color:white; border: 1px solid ' + moduleColor + '; ';
                let a3 = 'border: 1px solid ' + color + '; ';
                params.unshift(a3);
                params.unshift(a2);
                params.unshift(a1);
            }
            else {
                let a1 = '%c ' + moduleName + ' ';
                let a2 = 'background: ' + moduleColor + ';color:white; border: 1px solid ' + color + '; ';
                params.push(message);
                params.unshift(a2);
                params.unshift(a1);
            }
            console.log.apply(console, params);
        }
        if (helper_1.isNode) {
        }
    }
}
exports.Display = Display;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function contain(arr, item) {
    return arr.filter(l => l === item || ((item.match && typeof item.match === 'function') ? item.match(l) : false)).length > 0;
}
exports.contain = contain;
;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(5));
__export(__webpack_require__(0));
__export(__webpack_require__(1));


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __webpack_require__(6);
const level_1 = __webpack_require__(0);
const display_1 = __webpack_require__(2);
const include_1 = __webpack_require__(3);
const helper_1 = __webpack_require__(1);
if (helper_1.isNode) {
}
class Log {
    static create(name, ...level) {
        let i;
        if (Log.instances[name] === undefined) {
            i = new logger_1.Logger(name, Log.getRandomColor(), Log.isDevelopmentMode, level, Log.isMutedModule(name), Log.levels.length > 0 ? Log.fixedWidth : undefined, Log.levels.length > 0 ? Log.display : undefined);
            Log.instances[name] = i;
        }
        else {
            i = Log.instances[name];
        }
        return i;
    }
    static getRandomColor() {
        if (helper_1.isNode) {
        }
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
            display_1.Display.msg(name, data, name, Log.instances[moduleName].color, level_1.Level.DATA, Log.instances[moduleName].fixedWidth);
        }
        if (incomming === level_1.Level.ERROR) {
            display_1.Display.msg(name, data, name, Log.instances[moduleName].color, level_1.Level.ERROR, Log.instances[moduleName].fixedWidth);
        }
        if (incomming === level_1.Level.INFO) {
            display_1.Display.msg(name, data, name, Log.instances[moduleName].color, level_1.Level.INFO, Log.instances[moduleName].fixedWidth);
        }
        if (incomming === level_1.Level.WARN) {
            display_1.Display.msg(name, data, name, Log.instances[moduleName].color, level_1.Level.WARN, Log.instances[moduleName].fixedWidth);
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
Log.fixedWidth = 0;
Log._logOnly = false;
Log.levels = [];
Log._logModules = false;
Log.modules = [];
Log.isDevelopmentMode = true;
Log.modeIsSet = false;
exports.Log = Log;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const level_1 = __webpack_require__(0);
const display_1 = __webpack_require__(2);
const include_1 = __webpack_require__(3);
class Logger {
    constructor(name, color, developmentMode, allowed, isMuted, fixedWidth, display) {
        this.name = name;
        this.color = color;
        this.developmentMode = developmentMode;
        this.allowed = allowed;
        this.isMuted = isMuted;
        this.fixedWidth = fixedWidth;
        this.display = display;
        /** @deprecated Use data(...)
         * @see data
        */
        this.d = (name, ...data) => this._data(name, data);
        /** @deprecated Use error(...)
         * @see error
        */
        this.er = (name, ...data) => this._error(name, data);
        /** @deprecated Use info(...)
         * @see info
        */
        this.i = (name, ...data) => this._info(name, data);
        /** @deprecated Use warn(...)
         * @see warn
        */
        this.w = (name, ...data) => this._warn(name, data);
        /**
         * Logs message and data with the level=data
         * @param message The message
         * @param otherParams Additional parameters
         */
        this.data = (message, ...otherParams) => { return this._data(message, otherParams); };
        /**
         * Logs message and data with the level=error
         * @param message The message
         * @param otherParams Additional parameters
         */
        this.error = (message, ...otherParams) => this._error(message, otherParams);
        /**
         * Logs message and data with the level=info
         * @param message The message
         * @param otherParams Additional parameters
         */
        this.info = (message, ...otherParams) => this._info(message, otherParams);
        /**
         * Logs message and data with the level=warn
         * @param message The message
         * @param otherParams Additional parameters
         */
        this.warn = (message, ...otherParams) => this._warn(message, otherParams);
    }
    _data(name, ...data) {
        if (this.allowed.length >= 1 && include_1.contain(this.allowed, level_1.Level.__NOTHING)
            && !include_1.contain(this.allowed, level_1.Level.DATA))
            return this;
        if (Logger.isProductionMode)
            return this;
        if (this.display !== undefined)
            this.display(name, data, level_1.Level.DATA, this.name);
        else if (this.allowed.length === 0 || include_1.contain(this.allowed, level_1.Level.DATA)) {
            display_1.Display.msg.apply(undefined, [name, ...data, this.name, this.color, level_1.Level.DATA, this.fixedWidth]);
        }
        return this;
    }
    _error(name, ...data) {
        if (this.allowed.length >= 1 && include_1.contain(this.allowed, level_1.Level.__NOTHING)
            && !include_1.contain(this.allowed, level_1.Level.ERROR))
            return this;
        if (Logger.isProductionMode)
            return this;
        if (this.display !== undefined)
            this.display(name, data, level_1.Level.ERROR, this.name);
        else if (this.allowed.length === 0 || include_1.contain(this.allowed, level_1.Level.ERROR)) {
            display_1.Display.msg.apply(undefined, [name, ...data, this.name, this.color, level_1.Level.ERROR, this.fixedWidth]);
        }
        return this;
    }
    _info(name, ...data) {
        if (this.allowed.length >= 1 && include_1.contain(this.allowed, level_1.Level.__NOTHING)
            && !include_1.contain(this.allowed, level_1.Level.INFO))
            return this;
        if (Logger.isProductionMode)
            return this;
        if (this.display !== undefined)
            this.display(name, data, level_1.Level.INFO, this.name);
        else if (this.allowed.length === 0 || include_1.contain(this.allowed, level_1.Level.INFO)) {
            display_1.Display.msg.apply(undefined, [name, ...data, this.name, this.color, level_1.Level.INFO, this.fixedWidth]);
        }
        return this;
    }
    _warn(name, ...data) {
        if (this.allowed.length >= 1 && include_1.contain(this.allowed, level_1.Level.__NOTHING)
            && !include_1.contain(this.allowed, level_1.Level.WARN))
            return this;
        if (Logger.isProductionMode)
            return this;
        if (this.display !== undefined)
            this.display(name, data, level_1.Level.WARN, this.name);
        else if (this.allowed.length === 0 || include_1.contain(this.allowed, level_1.Level.WARN)) {
            display_1.Display.msg.apply(undefined, [name, ...data, this.name, this.color, level_1.Level.WARN, this.fixedWidth]);
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
            display_1.Display.msg(name, data, this.name, this.color, level, this.fixedWidth);
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


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const level_1 = __webpack_require__(0);
const helper_1 = __webpack_require__(1);
if (helper_1.isNode) {
}
function consoleLog(data, level) {
}
exports.consoleLog = consoleLog;
function displayParams(params = [], level) {
}
exports.displayParams = displayParams;
function replace(out, match, char, color) {
}
function handleObjectData(param, level) {
}
function istartedInVscode() {
}
exports.istartedInVscode = istartedInVscode;
function isObjectAfterStringify(s) {
}


/***/ })
/******/ ])));