const process= require('process');
process.removeAllListeners('warning');
const util = require('util');
const vm = require('vm');
const path = require('path');
const _ = require('lodash');
const fse = require('fs-extra');
const { crossPlatformPath } = require('tnp-core');

if(process.platform === 'win32') {
    process.argv = process.argv.map( a => crossPlatformPath(a) )
}
// console.log(`[run.js] process.argv`, process.argv)

const argsMinimist = require('minimist')(process.argv);
const pathToTmpEnv = path.join(process.cwd(), 'tmp-environment.json');
const pathToPackageJson = path.join(process.cwd(), 'package.json');
const pathToDist = path.join(process.cwd(), 'dist');
const pathToDistApp = path.join(pathToDist, 'app.js');
const RELATIVEPATHoverride = argsMinimist.RELATIVEPATHoverride;
// console.log(`[run.js] argsMinimist`, argsMinimist)
// console.log(`[run.js] RELATIVEPATHoverride: ${RELATIVEPATHoverride}`)
// console.log(`[run.js] pathToTmpEnv: ${pathToTmpEnv}`)
// console.log(`[run.js] pathToPackageJson: ${pathToPackageJson}`)
// console.log(`[run.js] pathToDist: ${pathToDist}`)
// console.log(`[run.js] pathToDistApp: ${pathToDistApp}`)

var sandbox = {
    require,
    global
}

function assignENV() {
    let ENV = '{}';
    if (fse.existsSync(pathToTmpEnv)) {
        ENV = fse.readFileSync(pathToTmpEnv, {
            encoding: 'utf8'
        });
    } else {
        console.warn('ENV will be not available... tmp-environment.json missing... ')
    }

    let { ENVoverride } = require('minimist')(process.argv);
    if (ENVoverride) {
        const stringJson = decodeURIComponent(ENVoverride);
        ENVoverride = JSON.parse(stringJson);
        ENV = JSON.parse(ENV);
        Object.assign(ENV, ENVoverride);
        ENV = JSON.stringify(ENV, null, 4);
    }
    sandbox.ENV = ENV;
    if (fse.existsSync(pathToPackageJson)) {
        try {
            ENV = JSON.parse(ENV)
            var data = fse.readJSONSync(pathToPackageJson, { encoding: 'utf8' }) || {};
        } catch (error) {
            console.warn(`[run.js] not able to read package.json ${pathToPackageJson}`);
            return;
        }
        const projects = _.get(ENV, 'workspace.projects', []);
        const currentProj = projects.find(({ name }) => name === data.name);
        const portFromWorkspaceSettings = currentProj && Number(currentProj.port);
        return _.isNumber(portFromWorkspaceSettings) ? portFromWorkspaceSettings : void 0;
    }
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

const possiblePortFromWorkspace = assignENV();
if (_.isNumber(possiblePortFromWorkspace) && !_.isNumber(port)) {
    port = possiblePortFromWorkspace;
}

let relativePath = './dist/app';

// console.log(`[run.js] RELATIVEPATHoverride: ${RELATIVEPATHoverride}`)
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

// console.log(`[run.js] relativePath: ${relativePath}`)

const script = new vm.Script(`
global["ENV"] = JSON.parse(ENV);
var app = require("${relativePath}").default;
app(${port},[${process.argv.slice(2).map(c => `"${c}"`).join(',')}]);
`);

const context = vm.createContext(sandbox);
script.runInContext(context);