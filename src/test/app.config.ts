import { Injectable, Inject } from '@angular/core';

import { Log } from '../log';
import { Level } from '../level';

@Injectable()
export class AppService {

    constructor() {
        Log.onlyModules('books');
        Log.onlyLevel(Level.INFO, Level.INFO);
        Log.setProductionMode();
    }

}
