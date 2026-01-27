Error.stackTraceLimit = 100;
global.i0 = {
  defineInjectable: function () { }
}
const process= require('process');
process.removeAllListeners('warning');

const fs = require('fs');
const path = require('path');
var pathToCliJS = {
  distDev: path.join(__dirname, '../dist/cli.js'),
  localOrNPm: path.join(__dirname, '../cli.js')
}
var p = fs.existsSync(pathToCliJS.distDev) ? pathToCliJS.distDev : pathToCliJS.localOrNPm;
global.globalSystemToolMode = true;
var run = require(p).start;
run(process.argv.slice(2));