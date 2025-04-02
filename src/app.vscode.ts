// import { Utils } from 'tnp-core/src';
// import { CommandType, executeCommand } from 'tnp-helpers/src';
// import type { ExtensionContext } from 'vscode';

// const group = 'Ng 2 Logger CLI essentials';

// export const commands: CommandType[] = (
//   [
//     {
//       title: 'hello world',
//     },
//     {
//       title: 'hey!',
//     },
//   ] as CommandType[]
// ).map(c => {
//   if (!c.command) {
//     c.command = `extension.${Utils.camelize(c.title)}`;
//   }
//   if (!c.group) {
//     c.group = group;
//   }
//   return c;
// });

// export function activate(context: ExtensionContext) {
//   for (let index = 0; index < commands.length; index++) {
//     const {
//       title = '',
//       command = '',
//       exec = '',
//       options,
//       isDefaultBuildCommand,
//     } = commands[index];
//     const sub = executeCommand(
//       title,
//       command,
//       exec,
//       options,
//       isDefaultBuildCommand,
//       context,
//     );
//     if (sub) {
//       context.subscriptions.push(sub);
//     }
//   }
// }

// export function deactivate() {}

// export default { commands };


