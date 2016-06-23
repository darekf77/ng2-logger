## ng2-logger (EARLY ALPHA) ##



Logger for angular 2 apps. Now logger become part of your application.

First import it:

    import { Log, Level } from 'ng2-logger/ng2-logger'

Simple use:

Init your log :

    const log = Log.create('books'); 

or if you wanna just log errors and warnings :

    const log = Log.create('books', Level.ERROR, Level.WARN); 
    
'books' is current class or anything inside *.ts file. 

After inited **log** you are able to start debugging: 

    log.d('object',obj) // console.log
    log.er('object',obj) // console.error
    log.i('object',obj) // console.info
    log.w('object',obj) // console.warn



**Production mode**
-------------------

You will not see anyting in prduction mode:

    Log.setProductionMode();


**Selective debug**
-------------------

Optional specify what you wanna see in yours debug console.

    export class AppComponent {   
        constructor(  ) {
            Log.onlyModules('books');
            Log.onlyLevel(Level.ERROR,Level.INFO); // it will override conf. from files
        }    
    }



