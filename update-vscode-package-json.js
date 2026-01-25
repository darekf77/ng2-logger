const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const dateformat = require('dateformat');
const outFolder = path.join(process.cwd(), 'out');
const fileName = process.argv[2] || 'extension';
const { crossPlatformPath, Helpers } = require('tnp-core/lib');
const { Project } =  require('tnp/lib');
const { HelpersTaon } = require('tnp-helpers/lib');

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
  const proj = Project.ins.nearestTo(crossPlatformPath([process.cwd(),'..']));
  proj.taonJson.saveToDisk('update vscode package.json');
  proj.taonJson.resources.forEach(r => {
    const pathToFileOrFolder = proj.pathFor(r);
    const dest = crossPlatformPath([process.cwd(), r]);
    if(!Helpers.exists(pathToFileOrFolder)){
      throw `Resource ${r} not found at ${pathToFileOrFolder}`;
    }
    if(Helpers.isFolder(pathToFileOrFolder)){
      HelpersTaon.copy(pathToFileOrFolder, dest);
    } else {
      HelpersTaon.copyFile(pathToFileOrFolder, dest);
    }
  } );
  console.log(`Using project: ${proj?.name} at ${proj?.location}`);
  delete require.cache[require.resolve(pathToConfig)]; // clear cache in watch mode
  const extModule = require(pathToConfig).default;
  const commands = extModule.commands || [];

  console.log(
    'Commands:',
    commands.map(t => `${t.group}: ${t.title}`).sort((a, b) => a.localeCompare(b))
  );

  const pkgjsonpath = path.join(process.cwd(), 'package.json');
  const pkgjson = JSON.parse(fs.readFileSync(pkgjsonpath, 'utf8'));

  pkgjson.contributes = proj.packageJson.contributes || {};
  pkgjson.contributes.commands = [];
  pkgjson.contributes.submenus = [];
  pkgjson.contributes.menus = {};
  pkgjson.contributes.menus["explorer/context"] = [];
  pkgjson.contributes.menus["editor/title/context"] = [];

  const visibleCommands = commands.filter(c => !c.hideContextMenu);

  // split standalone vs grouped
  const standalone = visibleCommands.filter(c => !c.group);
  const grouped = visibleCommands.filter(c => c.group);
  const groups = _.uniq(grouped.map(c => c.group));

  // Define submenus for grouped commands
  pkgjson.contributes.submenus = groups.map(group => ({
    id: `${_.kebabCase(group)}.submenu`,
    label: group
  }));

  // Define all commands
  pkgjson.contributes.commands = commands.map(c => ({
    command: c.command,
    title: c.title
  }));

  // Add standalone commands directly (no submenu)
  for (const c of standalone) {
    pkgjson.contributes.menus["explorer/context"].push({
      command: c.command,
      group: "navigation"
    });
    pkgjson.contributes.menus["editor/title/context"].push({
      command: c.command,
      group: "navigation"
    });
  }

  // Attach submenu triggers for grouped commands
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

    // Put group commands inside submenu
    pkgjson.contributes.menus[submenuId] = grouped
      .filter(c => c.group === group)
      .map(c => ({
        command: c.command
      }));
  }



  fs.writeFileSync(pkgjsonpath, JSON.stringify(pkgjson, null, 2), 'utf8');
  console.log('Done update package.json');
}