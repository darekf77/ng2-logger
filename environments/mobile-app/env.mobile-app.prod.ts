import type { EnvOptions } from 'tnp/src';
import baseEnv from './env.mobile-app.__';

const env: Partial<EnvOptions> = {
  ...baseEnv,
  release: {
    ...baseEnv.release,
  },
  build: {
    angularProd: true,
  }
};
export default env;
