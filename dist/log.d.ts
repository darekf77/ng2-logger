import { Logger } from './logger';
import { Level } from './level';
export declare class Log {
    private static instances;
    static create<TA>(name: string, ...level: Level[]): Logger<TA>;
    private static getRandomColor();
    private static display(name, data, incomming, moduleName);
    private static _logOnly;
    private static levels;
    static onlyLevel(...level: Level[]): void;
    private static _logModules;
    private static modules;
    static onlyModules(...modules: string[]): void;
    private static isMutedModule(moduleName);
    private static muteAllOtherModules();
    private static isDevelopmentMode;
    private static modeIsSet;
    static setProductionMode(): void;
}
