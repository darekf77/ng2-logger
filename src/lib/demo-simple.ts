import { Helpers } from 'tnp-core/src';
import { Log, Level } from './ng2-logger';

export function demoSimpleTs() {
  Helpers.taskStarted('SIMPLE LOGGER EDGE CASE DEMO');

  const log = Log.create('dashboard');
  const auth = Log.create('auth');
  const demo = Log.create('demo');

  log.info('info');
  demo.i('info alias');
  log.error('error');
  log.er('error alias');
  auth.data('data');
  log.data('PERNAMENT DISABLE');
  // Log.disableAllLogs();
  // log.error('NO');
  // log.error('STILL NO');

  // Log.enableAllLogs();
  auth.moduleWidth = 20;
  auth.d('data alias');
  demo.warn('warn');
  log.w('warn alias');
  //#endregion

  Helpers.taskDone('SIMPLE LOGGER EDGE CASE DEMO DONE');
}
