declare var require: any;
declare var process: any;

import { Level } from './level';
import { isNode, isBrowser } from "./helper";
import { consoleLog, displayParams, istartedInVscode } from "./backend-logging";

if (isNode) {
    //#region backend
    var chalk = require('chalk');
    var path = require('path');
    //#endregion
}

export class Display {

    static msg(
        message: string | any,
        params: any[],
        moduleName: string,
        moduleColor: string,
        level: Level,
        moduleWidth: number | undefined
    ) {
        let color = 'gray';
        if (level === Level.INFO) color = 'deepskyblue';
        if (level === Level.ERROR) color = 'red';
        if (level === Level.WARN) color = 'orange';

        if (moduleWidth) {
            const diff = moduleWidth - moduleName.length;
            if (diff > 0) {
                for (let i = 0; i < diff; i++) {
                    moduleName += ' ';
                }
            }
        }

        if (isBrowser) {
            const isEdgeOrIe8orAbove = (document['documentMode'] || /Edge/.test(navigator.userAgent));

            if (isEdgeOrIe8orAbove) {
                if (typeof message === 'string') {
                    let a1 = '[[ ' + moduleName + ' ]] ' + message + ' ';
                    params.unshift(a1);
                } else {
                    let a1 = '[[ ' + moduleName + ']] ';
                    params.push(message);
                    params.unshift(a1);
                }
                if (level === Level.INFO) {
                    console.info.apply(console, params);
                } else if (level === Level.ERROR) {
                    console.error.apply(console, params);
                } else if (level === Level.WARN) {
                    console.warn.apply(console, params);
                } else {
                    console.log.apply(console, params);
                }
            } else {
                if (typeof message === 'string') {
                    let a1 = '%c ' + moduleName + '  %c ' + message + ' ';
                    let a2 = 'background: ' + moduleColor + ';color:white; border: 1px solid ' + moduleColor + '; ';
                    let a3 = 'border: 1px solid ' + color + '; ';
                    params.unshift(a3);
                    params.unshift(a2);
                    params.unshift(a1);
                } else {
                    let a1 = '%c ' + moduleName + ' ';
                    let a2 = 'background: ' + moduleColor + ';color:white; border: 1px solid ' + color + '; ';
                    params.push(message);
                    params.unshift(a2);
                    params.unshift(a1);
                }
                console.log.apply(console, params);
            }

        } if (isNode) {
            //#region backend
            let a1 = chalk.bgHex(moduleColor)(chalk.black(moduleName));
            let p = params;
            if (typeof message === 'string') {
                a1 = a1 + chalk.keyword(color)(' [') + chalk.dim(message) + chalk.keyword(color)('] ');
            } else {
                p = [message].concat(params);
            }
            consoleLog(a1, level);
            displayParams(p, level);
            //#endregion
        }

    }

}
