import { Level } from './level';

export function contain(arr: any[], item: any): boolean {
    return arr.filter(l => l === item).length > 0;
};
