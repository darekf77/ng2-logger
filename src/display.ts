declare var require: any;
declare var process: any;

import { Level } from './level';
import { isNode, isBrowser } from "./helper";
import { consoleLog, displayParams, istartedInVscode } from "./backend-logging";

if (isNode) {
    var chalk = require('chalk');
    var path = require('path');
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
        } if (isNode) {
            let a1 = chalk.bgHex(moduleColor)(chalk.black(moduleName));
            let p = params;
            if (typeof message === 'string') {
                a1 = a1 + chalk.keyword(color)(' [') + chalk.dim(message) + chalk.keyword(color)('] ');
            } else {
                p = [message].concat(params);
            }
            consoleLog(a1, level);
            displayParams(p, level);
        }

    }

}
