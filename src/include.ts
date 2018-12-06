import { Level } from './level';

export function contain(arr: any[], item: any): boolean {
  return arr.filter(l => {
    if (l instanceof RegExp) {
      return l.test(item )
    }
    if (l === item) {
      return true;
    }
    if ((item.match && typeof item.match === 'function') ? item.match(l) : false) {
      return true
    }
    return false;
  }).length > 0;
};
