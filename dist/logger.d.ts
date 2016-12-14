import { Level } from './level';
export declare class Logger<T> {
    private name;
    color: string;
    private developmentMode;
    private allowed;
    private isMuted;
    private display;
    constructor(name: string, color: string, developmentMode: boolean, allowed: Level[], isMuted: boolean, display?: (name: string, data: any, leve: Level, moduleName: string) => void);
    d(name: string, ...data: any[]): this;
    er(name: string, ...data: any[]): this;
    i(name: string, ...data: any[]): this;
    w(name: string, ...data: any[]): this;
    private _logMessage(name, level, ...data);
    private _level;
    private level(l);
    static isProductionMode: boolean;
    mute(): void;
}
