"use strict";
var _1 = require('../');
var log = _1.Log.create('books', _1.Level.DATA);
var Book = (function () {
    function Book() {
    }
    Book.prototype.contructor = function () {
        log.d('asdasd').er('asdasd', 'asdasd');
        log.er('asd', 'asd');
    };
    Book.prototype.getSomething = function () {
    };
    return Book;
}());
exports.Book = Book;
//# sourceMappingURL=test-class.js.map