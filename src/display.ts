import { Level } from './level';
import * as _ from 'lodash';

export class Display {


    static msg(
        message: string,
        params: any[],
        moduleName: string,
        moduleColor: string,
        level: Level,
        moduleWidth: number | undefined
    ) {
        if (typeof window != 'undefined' && window.document) {
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

        let a1 = '%c ' + moduleName + '  %c ' + message + ' ';
        let a2 = 'background: ' + moduleColor + ';color:white; border: 1px solid ' + moduleColor + '; ';
        let a3 = 'border: 1px solid ' + color + '; ';
        params.unshift(a3);
        params.unshift(a2);
        params.unshift(a1);
        } else {
            params.unshift('[' + moduleName + '] ' + message);
        }
        console.log.apply(console, params);
    }

    static dir(message: string, params: any[],
        moduleName: string, moduleColor: string, level: Level) {

        let color = 'gray';
        if (level === Level.INFO) color = 'deepskyblue';
        if (level === Level.ERROR) color = 'red';
        if (level === Level.WARN) color = 'orange';

        let a1 = '%c ' + moduleName + '  %c ' + message + ' ';
        let a2 = 'background: ' + moduleColor + ';color:white; ';
        let a3 = 'border: 1px solid ' + color + '; ';
        params.unshift(a3);
        params.unshift(a2);
        params.unshift(a1);
        params = _.map(params, (object: any) => {
            if (typeof object === "object") {
                return _.cloneDeep(object);
            }
            return object;
        });
        console.log.apply(console, params);
    }



}
