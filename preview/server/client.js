/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var isomorphic_rest_1 = __webpack_require__(2);
var ng2_logger_1 = __webpack_require__(3);
var log = ng2_logger_1.Log.create('main application');
var log2 = ng2_logger_1.Log.create('auth module');
var log3 = ng2_logger_1.Log.create('books module');
var log4 = ng2_logger_1.Log.create("/Users/test/Projects/testProject/index.ts");
var User = /** @class */ (function () {
    function User() {
    }
    return User;
}());
exports.User = User;
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.hello = function () {
        var user = new User();
        return { send: user };
    };
    tslib_1.__decorate([
        isomorphic_rest_1.GET('/'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", typeof (_a = typeof isomorphic_rest_1.Response !== "undefined" && isomorphic_rest_1.Response) === "function" && _a || Object)
    ], UserController.prototype, "hello", null);
    UserController = tslib_1.__decorate([
        isomorphic_rest_1.ENDPOINT('/hello')
    ], UserController);
    return UserController;
    var _a;
}());
exports.UserController = UserController;
var Controllers = [UserController];
var Entities = [User];
var randomJSON = {
};
var user = new User();
user.id = 1;
user.name = 'Peter Parker';
user.friend = user;
// log.i([1, 2, 3] as any)
log3.i('test info');
log.er('test error', user);
log3.w('warning here', 'watch out!');
log2.d('debug this', user);
log2.i('info about json', randomJSON);
log4.er(user);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("tslib");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-rest");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("ng2-logger");

/***/ })
/******/ ]);