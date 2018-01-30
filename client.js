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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
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
var level_1 = __webpack_require__(0);
var helper_1 = __webpack_require__(1);
var backend_logging_1 = __webpack_require__(8);
if (helper_1.isNode) {

}
var Display = /** @class */ (function () {
    function Display() {
    }
    Display.msg = function (message, params, moduleName, moduleColor, level, moduleWidth) {
        var color = 'gray';
        if (level === level_1.Level.INFO)
            color = 'deepskyblue';
        if (level === level_1.Level.ERROR)
            color = 'red';
        if (level === level_1.Level.WARN)
            color = 'orange';
        if (moduleWidth) {
            var diff = moduleWidth - moduleName.length;
            if (diff > 0) {
                for (var i = 0; i < diff; i++) {
                    moduleName += ' ';
                }
            }
        }
        if (helper_1.isBrowser) {
            var isEdgeOrIe8orAbove = (document['documentMode'] || /Edge/.test(navigator.userAgent));
            if (isEdgeOrIe8orAbove) {
                if (typeof message === 'string') {
                    var a1 = '[[ ' + moduleName + ' ]] ' + message + ' ';
                    params.unshift(a1);
                }
                else {
                    var a1 = '[[ ' + moduleName + ']] ';
                    params.push(message);
                    params.unshift(a1);
                }
                if (level === level_1.Level.INFO) {
                    console.info.apply(console, params);
                }
                else if (level === level_1.Level.ERROR) {
                    console.error.apply(console, params);
                }
                else if (level === level_1.Level.WARN) {
                    console.warn.apply(console, params);
                }
                else {
                    console.log.apply(console, params);
                }
            }
            else {
                if (typeof message === 'string') {
                    var a1 = '%c ' + moduleName + '  %c ' + message + ' ';
                    var a2 = 'background: ' + moduleColor + ';color:white; border: 1px solid ' + moduleColor + '; ';
                    var a3 = 'border: 1px solid ' + color + '; ';
                    params.unshift(a3);
                    params.unshift(a2);
                    params.unshift(a1);
                }
                else {
                    var a1 = '%c ' + moduleName + ' ';
                    var a2 = 'background: ' + moduleColor + ';color:white; border: 1px solid ' + color + '; ';
                    params.push(message);
                    params.unshift(a2);
                    params.unshift(a1);
                }
                console.log.apply(console, params);
            }
        }
        if (helper_1.isNode) {

        }
    };
    return Display;
}());
exports.Display = Display;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var level_1 = __webpack_require__(0);
var display_1 = __webpack_require__(2);
var include_1 = __webpack_require__(4);
var Logger = /** @class */ (function () {
    function Logger(name, color, developmentMode, allowed, isMuted, fixedWidth, display) {
        var _this = this;
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
        this.d = function (name) {
            var data = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                data[_i - 1] = arguments[_i];
            }
            return _this._data(name, data);
        };
        /** @deprecated Use error(...)
         * @see error
        */
        this.er = function (name) {
            var data = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                data[_i - 1] = arguments[_i];
            }
            return _this._error(name, data);
        };
        /** @deprecated Use info(...)
         * @see info
        */
        this.i = function (name) {
            var data = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                data[_i - 1] = arguments[_i];
            }
            return _this._info(name, data);
        };
        /** @deprecated Use warn(...)
         * @see warn
        */
        this.w = function (name) {
            var data = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                data[_i - 1] = arguments[_i];
            }
            return _this._warn(name, data);
        };
        /**
         * Logs message and data with the level=data
         * @param message The message
         * @param otherParams Additional parameters
         */
        this.data = function (message) {
            var otherParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                otherParams[_i - 1] = arguments[_i];
            }
            return _this._data(message, otherParams);
        };
        /**
         * Logs message and data with the level=error
         * @param message The message
         * @param otherParams Additional parameters
         */
        this.error = function (message) {
            var otherParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                otherParams[_i - 1] = arguments[_i];
            }
            return _this._error(message, otherParams);
        };
        /**
         * Logs message and data with the level=info
         * @param message The message
         * @param otherParams Additional parameters
         */
        this.info = function (message) {
            var otherParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                otherParams[_i - 1] = arguments[_i];
            }
            return _this._info(message, otherParams);
        };
        /**
         * Logs message and data with the level=warn
         * @param message The message
         * @param otherParams Additional parameters
         */
        this.warn = function (message) {
            var otherParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                otherParams[_i - 1] = arguments[_i];
            }
            return _this._warn(message, otherParams);
        };
    }
    Logger.prototype._data = function (name) {
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
            display_1.Display.msg.apply(undefined, [name].concat(data, [this.name, this.color, level_1.Level.DATA, this.fixedWidth]));
        }
        return this;
    };
    Logger.prototype._error = function (name) {
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
            display_1.Display.msg.apply(undefined, [name].concat(data, [this.name, this.color, level_1.Level.ERROR, this.fixedWidth]));
        }
        return this;
    };
    Logger.prototype._info = function (name) {
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
            display_1.Display.msg.apply(undefined, [name].concat(data, [this.name, this.color, level_1.Level.INFO, this.fixedWidth]));
        }
        return this;
    };
    Logger.prototype._warn = function (name) {
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
            display_1.Display.msg.apply(undefined, [name].concat(data, [this.name, this.color, level_1.Level.WARN, this.fixedWidth]));
        }
        return this;
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
            display_1.Display.msg(name, data, this.name, this.color, level, this.fixedWidth);
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


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function contain(arr, item) {
    return arr.filter(function (l) { return l === item || ((item.match && typeof item.match === 'function') ? item.match(l) : false); }).length > 0;
}
exports.contain = contain;
;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(6);
tslib_1.__exportStar(__webpack_require__(7), exports);
tslib_1.__exportStar(__webpack_require__(0), exports);
tslib_1.__exportStar(__webpack_require__(1), exports);
tslib_1.__exportStar(__webpack_require__(3), exports);
tslib_1.__exportStar(__webpack_require__(2), exports);


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("tslib");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = __webpack_require__(3);
var level_1 = __webpack_require__(0);
var display_1 = __webpack_require__(2);
var include_1 = __webpack_require__(4);
var helper_1 = __webpack_require__(1);
if (helper_1.isNode) {

}
var Log = /** @class */ (function () {
    function Log() {
    }
    Log.create = function (name) {
        var level = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            level[_i - 1] = arguments[_i];
        }
        var i;
        if (Log.instances[name] === undefined) {
            i = new logger_1.Logger(name, Log.getRandomColor(), Log.isDevelopmentMode, level, Log.isMutedModule(name), Log.levels.length > 0 ? Log.fixedWidth : undefined, Log.levels.length > 0 ? Log.display : undefined);
            Log.instances[name] = i;
        }
        else {
            i = Log.instances[name];
        }
        return i;
    };
    Log.getRandomColor = function () {
        if (helper_1.isNode) {

        }
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
    };
    Log.onlyLevel = function () {
        var level = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            level[_i] = arguments[_i];
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
            modules[_i] = arguments[_i];
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
    Log.fixedWidth = 0;
    Log._logOnly = false;
    Log.levels = [];
    Log._logModules = false;
    Log.modules = [];
    Log.isDevelopmentMode = true;
    Log.modeIsSet = false;
    return Log;
}());
exports.Log = Log;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var level_1 = __webpack_require__(0);
var helper_1 = __webpack_require__(1);
if (helper_1.isNode) {

}
function consoleLog(data, level) {

}
exports.consoleLog = consoleLog;
function displayParams(params, level) {
    if (params === void 0) { params = []; }

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