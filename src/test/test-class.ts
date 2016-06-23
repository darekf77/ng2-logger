import { Log, Level } from '../';

const log = Log.create('books', Level.DATA);


export class Book {

    contructor() {
        log.d('asdasd').er('asdasd', 'asdasd');
        log.er('asd', 'asd');
    }

    getSomething() {


    }

}
