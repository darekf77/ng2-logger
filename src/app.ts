import { Firedev } from 'firedev';
import { Observable, map } from 'rxjs';
//#region @notForNpm
import { HOST_BACKEND_PORT } from './app.hosts';
//#region @browser
import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ng2-logger',
  template: `hello from ng2-logger<br>
    <br>
    users from backend
    <ul>
      <li *ngFor="let user of (users$ | async)"> {{ user | json }} </li>
    </ul>
  `,
  styles: [` body { margin: 0px !important; } `],
})
export class Ng2LoggerComponent implements OnInit {
  users$: Observable<User[]> = User.ctrl.getAll().received.observable
    .pipe(map(data => data.body.json));

  constructor() { }
  ngOnInit() { }
}

@NgModule({
  imports: [CommonModule],
  exports: [Ng2LoggerComponent],
  declarations: [Ng2LoggerComponent],
  providers: [],
})
export class Ng2LoggerModule { }
//#endregion

@Firedev.Entity({ className: 'User' })
class User extends Firedev.Base.Entity {
  public static ctrl?: UserController;
  //#region @websql
  @Firedev.Orm.Column.Generated()
  //#endregion
  id?: string | number;

}

@Firedev.Controller({ className: 'UserController', entity: User })
class UserController extends Firedev.Base.Controller<User> {

  //#region @websql
  async initExampleDbData(): Promise<void> {
    await this.repository.save(new User())
  }
  //#endregion
}

async function start() {
  console.log('hello world');
  console.log('Your server will start on port '+ HOST_BACKEND_PORT);
  const host = 'http://localhost:' + HOST_BACKEND_PORT;

  const context = await Firedev.init({
    host,
    controllers: [
      UserController,
      // PUT FIREDEV CONTORLLERS HERE
    ],
    entities: [
      User,
      // PUT FIREDEV ENTITIES HERE
    ],
    //#region @websql
    config: {
      type: 'better-sqlite3',
      database: 'tmp-db.sqlite',
      logging: false,
    }
    //#endregion
  });

  if (Firedev.isBrowser) {
    const users = (await User.ctrl.getAll().received).body.json;
    console.log({
      'users from backend': users
    })
  }
}

export default start;



//#endregion