export enum Level {
    DATA,
    INFO,
    WARN,
    ERROR ,
    __NOTHING ,
}

export const LevelKey = {
  [Level.DATA] : 'log',
  [Level.INFO] : 'info',
  [Level.WARN] : 'warn',
  [Level.ERROR] : 'error',
  [Level.__NOTHING] : '',
}

export const LevelOrder = [
  LevelKey[Level.DATA],
  LevelKey[Level.INFO],
  LevelKey[Level.WARN],
  LevelKey[Level.ERROR],
];
