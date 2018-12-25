import * as _ from 'lodash';
import { describe } from 'mocha'
import { expect } from 'chai';
// import { BrowserDB } from '../browser-db/browser-db';

import { Log, Logger } from '../index';
import { spy } from './helpers.spec';

// const instance = BrowserDB.instance;

const tmp = function (title: string, functionName: string, calls: string[]) {

  it(title, () => {

    expect(spy(console, functionName, () => {
      const log = Log.create('test')
      calls.forEach(c => {
        log[c]('test')
      })
    })).to.be.eq(2)

  });
}

describe('Basic log', () => {




  tmp('Should log.i and log.info call console.log', 'info', ['i', 'info'])
  tmp('Should log.w and log.warn call console.warn', 'warn', ['w', 'warn'])
  tmp('Should log.d and log.data call console.log', 'log', ['d', 'data'])
  tmp('Should log.er and log.error call console.log', 'error', ['er', 'error'])

});

