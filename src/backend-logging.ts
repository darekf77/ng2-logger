//#region @backend
declare var process: any;
//#endregion

import { Level } from './level';

//#region @backend
import { CLI } from 'tnp-cli';
import * as json5 from 'json5';
import * as stringify from 'json-stringify-safe';
//#endregion


export function consoleLog(data, level: Level) {
  //#region @backend
  if (level === Level.INFO) console.info(data);
  else if (level === Level.ERROR) console.error(data);
  else if (level === Level.WARN) console.warn(data);
  else console.log(data)
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

function replace(out: string, match: RegExp, char: RegExp, color) {
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


function handleObjectData(param, level: Level) {
  //#region @backend
  if (istartedInVscode()) {
    consoleLog(param, level);
    return;
  }
  let out = stringify(param, null, 4)
  out = replace(out, /\".*"\:\ \"/g, /\"\: "/, CLI.chalk.green);
  out = replace(out, /\".*"\:\ \{/g, /\"\: \{/, CLI.chalk.yellow);
  out = replace(out, /\".*"\:\ \[/g, /\"\: \[/, CLI.chalk.red);
  out = replace(out, /\".*"\:\ true/g, /\"\: true/, CLI.chalk.blue);
  out = replace(out, /\".*"\:\ false/g, /\"\: false/, CLI.chalk.blue);
  out = replace(out, /\".*"\:\ (\-|[0-9])/g, /\"\: (\-|[0-9])/, CLI.chalk.magenta);

  out = out.replace(/\"/g, CLI.chalk.dim('"'))
    .replace(/\{/g, CLI.chalk.dim('{'))
    .replace(/\}/g, CLI.chalk.dim('}'))
    .replace(/\}/g, CLI.chalk.dim('}'))

  if (process.stdout.columns && process.stdout.columns > 0) {
    out = out.split('\n').map(line => {
      return (line.length < process.stdout.columns ?
        line :
        line.slice(0, process.stdout.columns - 6) + CLI.chalk.dim('...'));
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
    const json = json5.parse(s);
    return true;
  } catch (error) {
    return false;
  }
  //#endregion
}
