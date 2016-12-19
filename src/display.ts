import { Level } from './level';

export class Display {


    static msg(message: string, params: any[],
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
        console.dir.apply(console, params);
    }



}
