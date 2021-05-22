
import { _ } from 'tnp-core';
import { describe } from 'mocha'
import { expect } from 'chai';
// import { BrowserDB } from '../browser-db/browser-db';

import { Log, Logger } from '../index';

export function spy(functionContext: Object, functionName: string, callback: () => void): number {
  let callCounter = 0;
  const prev = functionContext[functionName]
  functionContext[functionName] = function () {
    callCounter++;
  };
  callback()
  functionContext[functionName] = prev;
  return callCounter;
}

