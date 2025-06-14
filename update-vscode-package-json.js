const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const dateformat = require('dateformat');
const outFolder = path.join(process.cwd(), 'out');
const fileName = process.argv[2] || 'extension';

console.log('Update package.json vscode plugin metadata...');

const params = require('minimist')(process.argv);

if (params.watch) {
  const chokidar = require('chokidar');
  chokidar.watch([`${outFolder}/**/*.js`]).on('all', (event, path) => {
    console.log(`${dateformat(new Date(), 'HH:MM:ss')} updating package.json`);
    updatePackageJson();
  });
} else {
  updatePackageJson();
}

function updatePackageJson() {
  const pathToConfig = path.join(process.cwd(), 'out', fileName);
  const extModule = require(pathToConfig).default;
  const commands = extModule.commands || [];

  console.log('Commands:', commands.map(t => `${t.group}: ${t.title}`).sort( (a,b) => a.localeCompare(b) ) );

  const pkgjsonpath = path.join(process.cwd(), 'package.json');
  const pkgjson = JSON.parse(fs.readFileSync(pkgjsonpath, 'utf8'));

  pkgjson.contributes = pkgjson.contributes || {};
  pkgjson.contributes.commands = [];
  pkgjson.contributes.submenus = [];
  pkgjson.contributes.menus = pkgjson.contributes.menus || {};
  pkgjson.contributes.menus["explorer/context"] = [];
  pkgjson.contributes.menus["editor/title/context"] = [];
  pkgjson.contributes.menus = pkgjson.contributes.menus || {};

  const visibleCommands = commands.filter(c => !c.hideContextMenu);
  const groups = _.uniq(visibleCommands.map(c => c.group).filter(Boolean));

  // Define submenus
  pkgjson.contributes.submenus = groups.map(group => ({
    id: `${_.kebabCase(group)}.submenu`,
    label: group
  }));

  // Define all commands
  pkgjson.contributes.commands = commands.map(c => ({
    command: c.command,
    title: c.title
  }));

  // Attach submenu triggers to context menus
  for (const group of groups) {
    const submenuId = `${_.kebabCase(group)}.submenu`;
    pkgjson.contributes.menus["explorer/context"].push({
      submenu: submenuId,
      group: "navigation"
    });
    pkgjson.contributes.menus["editor/title/context"].push({
      submenu: submenuId,
      group: "navigation"
    });
  }

  // Place each command into its corresponding submenu
  for (const group of groups) {
    const submenuId = `${_.kebabCase(group)}.submenu`;
    const groupCommands = visibleCommands.filter(c => c.group === group);

    pkgjson.contributes.menus[submenuId] = groupCommands.map(c => ({
      command: c.command
    }));
  }

  fs.writeFileSync(pkgjsonpath, JSON.stringify(pkgjson, null, 2), 'utf8');
  console.log('Done update package.json');
}