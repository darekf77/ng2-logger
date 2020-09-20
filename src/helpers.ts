
export class Helpers {

  static simulateBrowser = false;
  static get isBrowser() {
    return Helpers.simulateBrowser || !!(typeof window !== 'undefined' && window.document);
  }
  static get isNode() {
    return Helpers.simulateBrowser || !Helpers.isBrowser;
  }
  static contain(arr: any[], item: any): boolean {
    return arr.filter(l => {
      if (l instanceof RegExp) {
        return l.test(item)
      }
      if (l === item) {
        return true;
      }
      if ((item.match && typeof item.match === 'function') ? item.match(l) : false) {
        return true
      }
      return false;
    }).length > 0;
  }

}
