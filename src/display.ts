import { Level } from './level';

export class Display {

    static msg(message: string, params: any[],
        moduleName: string, moduleColor: string, level: Level) {

        let color = 'gray';
        if (level === Level.INFO) color = 'deepskyblue';
        if (level === Level.ERROR) color = 'red';
        if (level === Level.WARN) color = 'orange';

        console.log('%c ' + moduleName + '  %c ' + message + ' ', 'background: '
            + moduleColor + ';color:white; ', 'border: 1px solid ' + color + '; ', params);

    }


}
