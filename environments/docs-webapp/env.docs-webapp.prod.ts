import type { EnvOptions } from 'tnp/src';
import baseEnv from './env.docs-webapp.__';

const env: Partial<EnvOptions> = {
  ...baseEnv,
  build: {
    ...baseEnv.build,
    angularProd: true,
  },
};
export default env;