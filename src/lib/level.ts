export enum Level {
    DATA,
    INFO,
    WARN,
    ERROR ,
    SUCCESS,
    TASK_STARTED,
    TASK_DONE,
    __NOTHING ,
}

export const LevelKey = {
  [Level.DATA] : 'log',
  [Level.INFO] : 'info',
  [Level.WARN] : 'warn',
  [Level.ERROR] : 'error',
  [Level.SUCCESS] : 'success',
  [Level.TASK_STARTED] : 'taskstarted',
  [Level.TASK_DONE] : 'taskdone',
  [Level.__NOTHING] : '',
}

export const LevelOrder = [
  LevelKey[Level.DATA],
  LevelKey[Level.TASK_STARTED],
  LevelKey[Level.TASK_DONE],
  LevelKey[Level.INFO],
  LevelKey[Level.SUCCESS],
  LevelKey[Level.WARN],
  LevelKey[Level.ERROR],
];
