import type { EnvOptions } from 'tnp/src';
import baseEnv from './env.vscode-plugin.__';
import type { EnvVSCodePaths } from './env.vscode-plugin.__';

const env: Partial<EnvOptions<EnvVSCodePaths>> = {
  ...baseEnv,
  paths: {
    vscodeDeployPath: 'dev.taon.tnp.vscode-plugin',
  },
};
export default env;
