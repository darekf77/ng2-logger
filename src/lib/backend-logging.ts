//#region @backend
declare var process: any;
//#endregion

import { Level } from './level';

//#region @backend
import { chalk } from 'tnp-core/src';
import * as json5 from 'json5';
import * as stringify from 'json-stringify-safe';
import { Helpers } from 'tnp-core/src';
//#endregion

export function consoleLog(data: string, level: Level) {
  //#region @backend
  if (level === Level.INFO) Helpers.info(data);
  else if (level === Level.ERROR) Helpers.error(data);
  else if (level === Level.WARN) Helpers.warn(data);
  else if (level === Level.SUCCESS) Helpers.success(data);
  else if (level === Level.TASK_STARTED) Helpers.taskStarted(data);
  else if (level === Level.TASK_DONE) Helpers.taskDone(data);
  else Helpers.log(data)
  //#endregion
}


export function displayParams(params: any[] = [], level: Level) {
  //#region @backend
  params.forEach(param => {
    if (typeof param === 'object') {
      handleObjectData(param, level)
    } else if (isObjectAfterStringify(param)) {
      handleObjectData(json5.parse(param), level)
    } else {
      consoleLog(param, level);
    }
  })
  //#endregion
}

function replace(out: string, match: RegExp, char: RegExp, color: any) {
  //#region @backend
  let m = out.match(match);
  let outer = out;
  if (m) m.forEach(p => {
    const rep = p
      .slice(1)
      .replace(char, '');
    outer = outer.replace(`"${rep}":`, `"${color.call(null, rep)}":`)
  })
  return outer;
  //#endregion
}


function handleObjectData(param: string, level: Level) {
  //#region @backend
  if (istartedInVscode()) {
    consoleLog(param, level);
    return;
  }
  let out = stringify(param, null, 4)
  out = replace(out, /\".*"\:\ \"/g, /\"\: "/, chalk.green);
  out = replace(out, /\".*"\:\ \{/g, /\"\: \{/, chalk.yellow);
  out = replace(out, /\".*"\:\ \[/g, /\"\: \[/, chalk.red);
  out = replace(out, /\".*"\:\ true/g, /\"\: true/, chalk.blue);
  out = replace(out, /\".*"\:\ false/g, /\"\: false/, chalk.blue);
  out = replace(out, /\".*"\:\ (\-|[0-9])/g, /\"\: (\-|[0-9])/, chalk.magenta);

  out = out.replace(/\"/g, chalk.dim('"'))
    .replace(/\{/g, chalk.dim('{'))
    .replace(/\}/g, chalk.dim('}'))
    .replace(/\}/g, chalk.dim('}'))

  if (process.stdout.columns && process.stdout.columns > 0) {
    out = out.split('\n').map(line => {
      return (line.length < process.stdout.columns ?
        line :
        line.slice(0, process.stdout.columns - 6) + chalk.dim('...'));
    }).join('\n');
  }
  consoleLog(out, level);
  //#endregion
}


export function istartedInVscode() {
  //#region @backend
  let args = process.execArgv;
  if (args) {
    return args.some((arg) =>
      /^--debug=?/.test(arg) ||
      /^--debug-brk=?/.test(arg) ||
      /^--inspect=?/.test(arg) ||
      /^--inspect-brk=?/.test(arg)
    );
  }
  return false;
  //#endregion
}

function isObjectAfterStringify(s: string) {
  //#region @backend
  try {
    json5.parse(s);
    return true;
  } catch (error) {
    return false;
  }
  //#endregion
}
