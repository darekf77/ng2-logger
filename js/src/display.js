"use strict";
var level_1 = require('./level');
var Display = (function () {
    function Display() {
    }
    Display.msg = function (message, params, moduleName, moduleColor, level) {
        var color = 'gray';
        if (level === level_1.Level.INFO)
            color = 'deepskyblue';
        if (level === level_1.Level.ERROR)
            color = 'red';
        if (level === level_1.Level.WARN)
            color = 'orange';
        var a1 = '%c ' + moduleName + '  %c ' + message + ' ';
        var a2 = 'background: ' + moduleColor + ';color:white; ';
        var a3 = 'border: 1px solid ' + color + '; ';
        params.unshift(a3);
        params.unshift(a2);
        params.unshift(a1);
        console.log.apply(console, params);
    };
    return Display;
}());
exports.Display = Display;
//# sourceMappingURL=display.js.map