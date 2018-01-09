import { Component, OnInit } from '@angular/core';

import { User, UserController } from '../../../server/client';

// import { Log, Level } from 'ng2-logger';


// const log = Log.create('app module');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    console.log(User, UserController);
    // log.i('asdasd');

    // log.i('asdasd', {
    //   'glossary': {
    //     'title': 'example glossary',
    //     'GlossDiv': {
    //       'title': 'S',
    //       'GlossList': {
    //         'GlossEntry': {
    //           'ID': 'SGML',
    //           'SortAs': 'SGML',
    //           'GlossTerm': 'Standard Generalized Markup Language',
    //           'Acronym': 'SGML',
    //           'Abbrev': 'ISO 8879:1986',
    //           'GlossDef': {
    //             'para': 'A meta-markup language, used to create markup languages such as DocBook.',
    //             'GlossSeeAlso': ['GML', 'XML']
    //           },
    //           'GlossSee': 'markup'
    //         }
    //       }
    //     }
    //   }
    // })
  }
  title = 'app';



}
