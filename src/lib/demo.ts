import { Helpers } from 'tnp-core/src';
import { Log, Level } from './ng2-logger';

export function demoTs() {

  const separator = (title: string) => {
    console.log('\n\n==============================');
    console.log(title);
    console.log('==============================\n');
  };

  Helpers.taskStarted('LOGGER EDGE CASE DEMO');

  //#region BASIC USAGE
  separator('1️⃣ BASIC USAGE');

  const log = Log.create('cli');

  log.info('info');
  log.i('info alias');
  log.error('error');
  log.er('error alias');
  log.data('data');
  log.d('data alias');
  log.warn('warn');
  log.w('warn alias');
  //#endregion


  //#region GLOBAL LEVEL
  separator('2️⃣ GLOBAL LEVEL (WARN+)');

  Log.setGlobalLevel(Level.WARN);

  log.info('SHOULD NOT PRINT');
  log.warn('SHOULD PRINT');
  log.error('SHOULD PRINT');

  Log.setGlobalLevel(null as any);
  //#endregion


  //#region ONLY LEVEL
  separator('3️⃣ ONLY LEVEL (ERROR ONLY)');

  Log.onlyLevel(Level.ERROR);

  log.info('NO');
  log.error('YES');

  Log.onlyLevel(); // reset (if your impl allows)
  //#endregion


  //#region DISABLE / ENABLE
  separator('4️⃣ DISABLE / ENABLE');

  Log.disableAllLogs();
  log.error('NO PRINT');
  console.log('console.log blocked');

  Log.enableAllLogs();
  log.error('PRINT AGAIN');
  //#endregion


  //#region PERMANENT DISABLE
  // separator('5️⃣ PERMANENT DISABLE');

  // Log.disableAllLogsPermanetly();
  // log.error('NO');
  // Log.enableAllLogs();
  // log.error('STILL NO');

  // NOTE:
  // After this point console is dead permanently.
  // So we re-enable manually for demo continuation:
  // console.log = (...args: any[]) => process.stdout.write(args.join(' ') + '\n');
  //#endregion


  //#region MUTED MODULES
  separator('6️⃣ MUTED MODULES');

  Log.settings.mutedModules = ['allowed'];

  const allowed = Log.create('allowed');
  const blocked = Log.create('blocked');

  allowed.info('YES');
  blocked.info('NO');

  Log.settings.mutedModules = [];
  //#endregion


  //#region SET LEVEL PER LOGGER
  separator('7️⃣ LOGGER.setLevel');

  const levelLog = Log.create('level-test');
  levelLog.setLevel(Level.ERROR);

  levelLog.warn('NO');
  levelLog.error('YES');
  //#endregion


  //#region LARGE OBJECT
  separator('8️⃣ LARGE OBJECT');

  log.info('large object', {
    nested: {
      arr: Array.from({ length: 50 }, (_, i) => i),
    },
  });
  //#endregion


  //#region CIRCULAR OBJECT
  separator('9️⃣ CIRCULAR OBJECT');

  const circular: any = {};
  circular.self = circular;

  log.info('circular test', circular);
  //#endregion


  //#region ERROR OBJECT
  separator('🔟 ERROR OBJECT');

  try {
    throw new Error('boom');
  } catch (e) {
    log.error('caught error', e);
  }
  //#endregion


  //#region SPECIAL VALUES
  separator('1️⃣1️⃣ SPECIAL VALUES');

  log.info(null as any);
  log.info(undefined as any);
  log.info(NaN as any);
  log.info(Symbol('test') as any);
  log.info(BigInt(123) as any);
  //#endregion


  //#region VERY LONG MESSAGE
  separator('1️⃣2️⃣ VERY LONG MESSAGE');

  log.error('x'.repeat(2000));
  //#endregion


  //#region TIMESTAMP
  separator('1️⃣3️⃣ TIMESTAMP');

  Log.settings.showTimestamp = true;
  log.info('with timestamp');
  Log.settings.showTimestamp = false;
  //#endregion


  //#region CONCURRENCY SPAM
  separator('1️⃣4️⃣ STRESS TEST (100 logs)');

  for (let i = 0; i < 100; i++) {
    log.info(`spam ${i}`);
  }
  //#endregion


  //#region MULTIPLE MODULES
  separator('1️⃣5️⃣ MULTIPLE MODULES');

  const a = Log.create('a');
  const b = Log.create('b');

  a.info('module a');
  b.info('module b');
  //#endregion


  //#region MODULE NAME TRIM EDGE CASE
  separator('1️⃣6️⃣ MODULE NAME TRIM');

  const spaced = Log.create('networking ');
  const trimmed = Log.create('networking');

  spaced.info('with trailing space');
  trimmed.info('without trailing space');

  //#endregion

  Helpers.taskDone('LOGGER EDGE CASE DEMO DONE');
}
