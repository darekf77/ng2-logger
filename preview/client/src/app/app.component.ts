import { Component, OnInit } from '@angular/core';

import { Log, Level } from 'ng2-logger/browser';

const log = Log.create('app component');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    log.d('ddd');
    log.w('waasdasdasd');
    log.er('asdasd');
    log.i('asdasd');

    log.i('aaa', {
      'glossary': {
        'title': 'example glossary',
        'GlossDiv': {
          'title': 'S',
          'GlossList': {
            'GlossEntry': {
              'ID': 'SGML',
              'SortAs': 'SGML',
              'GlossTerm': 'Standard Generalized Markup Language',
              'Acronym': 'SGML',
              'Abbrev': 'ISO 8879:1986',
              'GlossDef': {
                'para': 'A meta-markup language, used to create markup languages such as DocBook.',
                'GlossSeeAlso': ['GML', 'XML']
              },
              'GlossSee': 'markup'
            }
          }
        }
      }
    })
  }
  title = 'app';



}
