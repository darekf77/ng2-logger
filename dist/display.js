"use strict";
const level_1 = require("./level");
const _ = require("lodash");
class Display {
    static msg(message, params, moduleName, moduleColor, level) {
        let color = 'gray';
        if (level === level_1.Level.INFO)
            color = 'deepskyblue';
        if (level === level_1.Level.ERROR)
            color = 'red';
        if (level === level_1.Level.WARN)
            color = 'orange';
        let a1 = '%c ' + moduleName + '  %c ' + message + ' ';
        let a2 = 'background: ' + moduleColor + ';color:white; ';
        let a3 = 'border: 1px solid ' + color + '; ';
        params.unshift(a3);
        params.unshift(a2);
        params.unshift(a1);
        console.log.apply(console, params);
    }
    static dir(message, params, moduleName, moduleColor, level) {
        let color = 'gray';
        if (level === level_1.Level.INFO)
            color = 'deepskyblue';
        if (level === level_1.Level.ERROR)
            color = 'red';
        if (level === level_1.Level.WARN)
            color = 'orange';
        let a1 = '%c ' + moduleName + '  %c ' + message + ' ';
        let a2 = 'background: ' + moduleColor + ';color:white; ';
        let a3 = 'border: 1px solid ' + color + '; ';
        params.unshift(a3);
        params.unshift(a2);
        params.unshift(a1);
        params = _.map(params, (object) => {
            if (typeof object === "object") {
                return _.cloneDeep(object);
            }
            return object;
        });
        console.log.apply(console, params);
    }
}
exports.Display = Display;
//# sourceMappingURL=display.js.map