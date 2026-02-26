Error.stackTraceLimit = 100;
global.i0 = {
  defineInjectable: function () { }
}
const process= require('process');
process.removeAllListeners('warning');
var argv = process.argv;

global.hideLog = true;
global.verboseLevel = 0;
var verboseLevel = argv.find(a => a.startsWith('-verbose='));
if (typeof verboseLevel !== 'undefined') {
  global.hideLog = false;
  verboseLevel = Number(verboseLevel.replace('-verbose=', ''));
  if (!isNaN(verboseLevel)) {
    global.verboseLevel = verboseLevel;
  }
  argv = argv.filter(a => !a.startsWith('-verbose='));
}

if (argv.includes('-verbose')) {
  global.hideLog = false;
  argv = argv.filter(a => a !== '-verbose');
}

const fs = require('fs');
const path = require('path');
var pathToCliJS = {
  distDev: path.join(__dirname, '../dist/cli.js'),
  localOrNPm: path.join(__dirname, '../cli.js')
}
var p = fs.existsSync(pathToCliJS.distDev) ? pathToCliJS.distDev : pathToCliJS.localOrNPm;
global.globalSystemToolMode = true;
var run = require(p).startCli;
run(argv,__filename);