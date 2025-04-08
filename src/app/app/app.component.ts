import { Component, OnInit } from '@angular/core';

import { Log, Level } from 'ng2-logger';

const log = Log.create('app component');


log.i('test test')
log.er('error test')

log.er('error test',['asdasd'])

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    log.d('debug message');
    log.w('waring message');
    log.er('error message');
    log.i('info message');

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