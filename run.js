const process= require('process');
process.removeAllListeners('warning');
const path = require('path');
const fse = require('fs-extra');

const argsMinimist = require('minimist')(process.argv);

const pathToDist = path.join(process.cwd(), 'dist');
const pathToDistApp = path.join(pathToDist, 'app.js');

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

const PROJECT_NPM_NAME = require('./dist/lib/build-info._auto-generated_.js').PROJECT_NPM_NAME;
console.log({PROJECT_NPM_NAME})

var app = require('./dist/app').default;
app({
   onlyMigrationRun: argsMinimist.onlyMigrationRun,
   onlyMigrationRevertToTimestamp: argsMinimist.onlyMigrationRevertToTimestamp,
   args: [process.argv.slice(2).map(c => `"${c}"`).join(',')]
});
process.stdin.resume();