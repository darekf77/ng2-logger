
export class Helpers {

  static simulateBrowser = false;
  static isBrowser = !!(typeof window !== 'undefined' && window.document);
  static isNode = (function () {
    Helpers.isNode = !Helpers.isBrowser;
    return Helpers.isNode;
  })() as boolean;

}
