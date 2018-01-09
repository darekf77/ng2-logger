"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
//#region backend
console.log('heeloa');
var _ = require("lodash");
require("reflect-metadata");
//#endregion
var isomorphic_rest_1 = require("isomorphic-rest");
var ng2_logger_1 = require("ng2-logger");
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
        tslib_1.__metadata("design:returntype", Object)
    ], UserController.prototype, "hello", null);
    UserController = tslib_1.__decorate([
        isomorphic_rest_1.ENDPOINT('/hello')
    ], UserController);
    return UserController;
}());
exports.UserController = UserController;
var Controllers = [UserController];
var Entities = [User];
//#region backend
function start() {
    isomorphic_rest_1.init('http://localhost:4000').expressApp({
        controllers: _.values(Controllers),
        entities: _.values(Entities)
    });
}
exports.start = start;
start();
//#endregion
var randomJSON = {
    //#region backend
    "_id": "5a53ce64f67745e7b894ac84",
    "index": 5,
    "guid": "c99745b8-a806-448c-a25a-ca119ce231e5",
    "isActive": true,
    "balance": "$2,181.59",
    "picture": "http://placehold.it/32x32",
    "age": 38,
    "eyeColor": "blue",
    "name": "Hutchinson Stanley",
    "gender": "male",
    "company": "ZIPAK",
    "email": "hutchinsonstanley@zipak.com",
    "phone": "+1 (902) 487-3299",
    "address": "147 Tompkins Place, Volta, Pennsylvania, 8514",
    "about": "Tempor voluptate sint nulla qui dolor culpa ea pariatur. Proident ea dolor laboris exercitation non dolore ad elit duis. Nostrud non excepteur cillum incididunt occaecat. Voluptate esse velit proident officia voluptate ipsum exercitation exercitation nulla qui veniam.\r\n",
    "registered": "2014-12-28T12:28:33 -01:00",
    "latitude": -61.247966,
    "longitude": -35.969817,
    "tags": [
        "ullamco",
        "mollit",
        "deserunt",
        "fugiat",
        "ad",
        "exercitation",
        "sunt"
    ],
    "friends": [
        {
            "id": 0,
            "name": "Lou Gordon"
        },
        {
            "id": 1,
            "name": "Cherry Hernandez"
        },
        {
            "id": 2,
            "name": "Jeannette Vaughan"
        }
    ],
    "greeting": {
        "favoriteFruit": "strawberry"
    }
    //#endregion
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
//# sourceMappingURL=index.js.map