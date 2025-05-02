const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const dateformat = require('dateformat');
const outFolder = path.join(process.cwd(), 'out');
const fileName =  process.argv[2] || 'extension';

console.log('Update package.json vscode plugin metadata...')

const params = require('minimist')(process.argv);

if (params.watch) {
  const chokidar = require('chokidar');

  // One-liner for current directory
  chokidar.watch([`${outFolder}/**/*.js`]).on('all', (event, path) => {
    console.log(`${dateformat(new Date(), 'HH:MM:ss')} updating package.json`);
    updatePackageJson();
  });
} else {
  updatePackageJson();
}


function updatePackageJson() {
  const pathToConfig = path.join(process.cwd(), 'out/'+ fileName);
  // console.log(fs.readFileSync(pathToConfig + '.js', { encoding: 'utf8' }))
  const extModule = require(pathToConfig).default;
  // console.log({extModule})
  const  commands  = extModule.commands || [];
  console.log(commands.map(t => t.title))
  const pkgjsonpath = path.join(process.cwd(), 'package.json');
  const pkgjson = JSON.parse(fs.readFileSync(pkgjsonpath, { encoding: 'utf8' }));

  pkgjson.contributes = pkgjson.contributes || {};
  pkgjson.contributes.commands = pkgjson.contributes.commands || [];
  pkgjson.contributes.menus = pkgjson.contributes.menus || {};

  pkgjson.contributes.commands = commands.map(c => {
    return { command: c.command, title: c.title };
  });

  pkgjson.contributes.menus["explorer/context"] = commands
    .filter(c => !c.hideContextMenu)
    .map(c => {
      return { command: c.command };
    });

  pkgjson.contributes.menus["editor/title/context"] = commands
    .filter(c => !c.hideContextMenu)
    .map(c => {
      return { command: c.command, group: c.group };
    });

  fs.writeFileSync(pkgjsonpath, JSON.stringify(pkgjson, null, 2), { encoding: 'utf8' });
  console.log('Done update package.json');
}