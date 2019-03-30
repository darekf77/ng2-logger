
export class Helpers {

  static simulateBrowser = false;
  static get isBrowser() {
    return Helpers.simulateBrowser || !!(typeof window !== 'undefined' && window.document);
  }
  static get isNode() {
    return Helpers.simulateBrowser || !Helpers.isBrowser;
  }
}
