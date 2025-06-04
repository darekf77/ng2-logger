const process= require('process');
process.removeAllListeners('warning');
const vm = require('vm');
const path = require('path');
const _ = require('lodash');
const fse = require('fs-extra');

const argsMinimist = require('minimist')(process.argv);

const pathToDist = path.join(process.cwd(), 'dist');
const pathToDistApp = path.join(pathToDist, 'app.js');
const RELATIVEPATHoverride = argsMinimist.RELATIVEPATHoverride;

var sandbox = {
  require,
  global
}

let { port } = require('minimist')(process.argv);
port = !isNaN(Number(port)) ? Number(port) : void 0;

const encoding = 'utf8';
var secondsWaitAfterDistDetected = 5;

function emptyDistFolder() {
  return !(
    fse.existsSync(pathToDist) &&
    fse.lstatSync(pathToDist).isDirectory() &&
    fse.existsSync(pathToDistApp) &&
    fse.readFileSync(pathToDistApp, { encoding }).toString().search('default') !== -1
  );
}

if (!RELATIVEPATHoverride || RELATIVEPATHoverride.trim().length === 0) {
  var messageWasShown = false;
  while (emptyDistFolder()) {
    var seconds = 2;
    if (!messageWasShown) {
      messageWasShown = true;
      console.log(`Waiting for build process...`);
    }
    var waitTill = new Date(new Date().getTime() + seconds * 1000);
    while (waitTill > new Date()) { }
  }
  if (messageWasShown) {
    var waitTill = new Date(new Date().getTime() + secondsWaitAfterDistDetected * 1000);
    while (waitTill > new Date()) { }
  }
}


const PROJECT_NPM_NAME = require('./dist/lib/build-info._auto-generated_.js').PROJECT_NPM_NAME;
console.log({PROJECT_NPM_NAME})
let relativePath = './tmp-local-copyto-proj-dist/node_modules/' + PROJECT_NPM_NAME  + '/app';


if (RELATIVEPATHoverride) {
  relativePath = RELATIVEPATHoverride.replace(/\.js$/, '')
}
if (relativePath.startsWith('/')) {
  relativePath = `.${relativePath}`;
}
if (!relativePath.startsWith('./')) {
  relativePath = `./${relativePath}`;
}

if (isNaN(Number(port))) {
  port = 4000;
}


const script = new vm.Script(`
var app = require("${relativePath}").default;
app({
   port:${port},
   onlyMigrationRun: ${argsMinimist.onlyMigrationRun},
   onlyMigrationRevertToTimestamp: ${argsMinimist.onlyMigrationRevertToTimestamp},
   args: [${process.argv.slice(2).map(c => `"${c}"`).join(',')}]
});
`);

const context = vm.createContext(sandbox);
script.runInContext(context);