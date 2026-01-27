//#region tnp-helpers cli template
// import { Helpers, BaseCommandLineFeature } from 'tnp-helpers/src';
// import { BaseProject, BaseStartConfig } from 'tnp-helpers/src'; // @backend

import { Log } from "./log";

// class $Version extends BaseCommandLineFeature<{}> {
//   public _() {
//     console.log(`Hello world from cli`);
//     this._exit();
//   }
// }
//#endregion

export async function start(argsv: string[]): Promise<void> {
  //#region @backendFunc
  const log = Log.create('start cli')
  console.log('Hello from cli');
  console.log({ argsv });

  log.info(`hello `)
  process.exit(0);

  //#region start config
  // new BaseStartConfig({
  //   ProjectClass: BaseProject,
  //   functionsOrClasses: [
  //     {
  //       classOrFnName: '$Version',
  //       funcOrClass: $Version,
  //     },
  //   ],
  //   argsv,
  //   useStringArrForArgsFunctions: true,
  //   shortArgsReplaceConfig: {
  //     v: 'version',
  //   },
  //   callbackNotRecognizedCommand: async () => {
  //     Helpers.error(`Command not recognized`, false, true);
  //   },
  // });
  //#endregion
  //#endregion
}
