import { Helpers } from 'tnp-core/src';

import { demoTs } from './demo';
import { demoSimpleTs } from './demo-simple';
import { Log } from './ng2-logger';

export async function startCli(
  argsv: string[],
  filename: string,
): Promise<void> {
  //#region @backendFunc
  // demoTs()
  demoSimpleTs();
  process.exit(0);
  //#endregion
}

export default startCli;
