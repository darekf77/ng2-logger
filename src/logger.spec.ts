import {
    it,
    inject,
    injectAsync,
    beforeEachProviders
} from '@angular/core/testing';

// Load the implementations that should be tested

import {provide} from '@angular/core';
import {Http, HTTP_PROVIDERS, XHRBackend} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

// import { Log } from './logger';
import { Book } from './test/test-class';


describe('ng2-logger', () => {
    // provide our implementations or mocks to the dependency injector
    // beforeEachProviders(() => [
    //     Http, HTTP_PROVIDERS,
    //     provide(XHRBackend, { useClass: MockBackend }),
    //     Log
    // ]);


    // it('should log something', inject([Log], (log: Log<{}>) => {
    //     Log.er('asdasd');
    // }));




});
