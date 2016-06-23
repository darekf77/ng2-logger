import { Log } from '../log';
import { Level } from '../level';

const log = Log.create('books',Level.DATA);


export class Book {

    contructor() {        
        log.d('asdasd').er('asdasd','asdasd');
        log.er('asd','asd');
    }

    getSomething() {


    }

}
