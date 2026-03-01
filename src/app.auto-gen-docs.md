App **ng2-logger**

isomorphic logger for browser/server in typescript:


<details>
<summary>imports</summary>

```ts
import * as os from 'os'; // @backend

import { AsyncPipe, JsonPipe, NgFor } from '@angular/common'; // @browser
import {
  inject,
  Injectable,
  APP_INITIALIZER,
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  isDevMode,
  mergeApplicationConfig,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core'; // @browser
import { Component } from '@angular/core'; // @browser
import { VERSION, OnInit } from '@angular/core'; // @browser
import { toSignal } from '@angular/core/rxjs-interop'; // @browser
import { MatButtonModule } from '@angular/material/button'; // @browser
import { MatCardModule } from '@angular/material/card'; // @browser
import { MatDividerModule } from '@angular/material/divider'; // @browser
import { MatIconModule } from '@angular/material/icon'; // @browser
import { MatListModule } from '@angular/material/list'; // @browser
import { MatTabsModule } from '@angular/material/tabs'; // @browser
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import {
  provideRouter,
  Router,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
  ActivatedRoute,
  Routes,
  Route,
  withHashLocation,
} from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { RenderMode, ServerRoute } from '@angular/ssr';
import Aura from '@primeng/themes/aura'; // @browser
import { providePrimeNG } from 'primeng/config'; // @browser
import { BehaviorSubject, Observable, map, switchMap } from 'rxjs';
import {
  Taon,
  TaonBaseContext,
  TAON_CONTEXT,
  EndpointContext,
  TaonBaseAngularService,
  TaonEntity,
  StringColumn,
  TaonBaseAbstractEntity,
  TaonBaseCrudController,
  TaonController,
  GET,
  TaonMigration,
  TaonBaseMigration,
  TaonContext,
} from 'taon/src';
import { Helpers, Utils, UtilsOs } from 'tnp-core/src';

import { HOST_CONFIG } from './app.hosts';
import { demoTs } from './lib/demo';
import { demoSimpleTs } from './lib/demo-simple';
import { ENV_ANGULAR_NODE_APP_BUILD_PWA_DISABLE_SERVICE_WORKER } from './lib/env/env.angular-node-app';
// @placeholder-for-imports
```

</details>


<details>
<summary>constants</summary>

```ts
const firstHostConfig = (Object.values(HOST_CONFIG) || [])[0];
console.log('Your backend host ' + firstHostConfig?.host);
console.log('Your frontend host ' + firstHostConfig?.frontendHost);
```

</details>


<details>
<summary>ng-2-logger component</summary>

```ts

//#region @browser
@Component({
  selector: 'app-root',

  imports: [
    // RouterOutlet,
    AsyncPipe,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatListModule,
    MatTabsModule,
    RouterModule,
    JsonPipe,
  ],
  template: `
    @if (itemsLoaded()) {
      @if (navItems.length > 0) {
        <nav
          mat-tab-nav-bar
          class="shadow-1"
          [tabPanel]="tabPanel">
          @for (item of navItems; track item.path) {
            <a
              mat-tab-link
              href="javascript:void(0)"
              [style.text-decoration]="
                (activePath === item.path && !forceShowBaseRootApp) ||
                ('/' === item.path && forceShowBaseRootApp)
                  ? 'underline'
                  : 'none'
              "
              (click)="navigateTo(item)">
              @if (item.path === '/') {
                <mat-icon
                  aria-hidden="false"
                  aria-label="Example home icon"
                  fontIcon="home"></mat-icon>
              } @else {
                {{ item.label }}
              }
            </a>
          }
        </nav>

        <mat-tab-nav-panel #tabPanel>
          @if (!forceShowBaseRootApp) {
            <router-outlet />
          }
        </mat-tab-nav-panel>
      }
      @if (navItems.length === 0 || forceShowBaseRootApp) {
        <mat-card class="m-2">
          <mat-card-content>
            <h3>Basic app info</h3>
            Name: ng-2-logger<br />
            Angular version: {{ angularVersion }}<br />
            Taon backend: {{ taonMode }}<br />
          </mat-card-content>
        </mat-card>

        <mat-card class="m-2">
          <mat-card-content>
            <h3>Example users from backend API:</h3>
            <ul>
              @for (user of users(); track user.id) {
                <li>
                  {{ user | json }}
                  <button
                    mat-flat-button
                    (click)="deleteUser(user)">
                    <mat-icon>delete user</mat-icon>
                  </button>
                </li>
              }
            </ul>
            <br />
            <button
              class="ml-1"
              matButton="outlined"
              (click)="addUser()">
              Add new example user with random name
            </button>
          </mat-card-content>
        </mat-card>

        <mat-card class="m-2">
          <mat-card-content>
            <h3>Example hello world from backend API:</h3>
            hello world from backend: <strong>{{ hello$ | async }}</strong>
          </mat-card-content>
        </mat-card>
      }
    }
  `,
})
export class Ng2LoggerApp implements OnInit {
  itemsLoaded = signal(false);

  navItems =
    Ng2LoggerClientRoutes.length <= 1
      ? []
      : Ng2LoggerClientRoutes.filter(r => r.path !== undefined).map(r => ({
          path: r.path === '' ? '/' : `/${r.path}`,
          label: r.path === '' ? 'Home' : `${r.path}`,
        }));

  activatedRoute = inject(ActivatedRoute);

  get activePath(): string {
    return globalThis?.location.pathname?.split('?')[0];
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(globalThis?.location.pathname);
    // TODO set below from 1000 to zero in production
    Taon.removeLoader(1000).then(() => {
      this.itemsLoaded.set(true);
    });
  }

  taonMode = UtilsOs.isRunningInWebSQL() ? 'websql' : 'normal nodejs';

  angularVersion = VERSION.full;

  userApiService = inject(UserApiService);

  router = inject(Router);

  private refresh = new BehaviorSubject<void>(undefined);

  readonly users = toSignal(
    this.refresh.pipe(
      switchMap(() =>
        this.userApiService.userController
          .getAll()
          .request()
          .observable.pipe(map(r => r.body.json)),
      ),
    ),
    { initialValue: [] },
  );

  readonly hello$ = this.userApiService.userController
    .helloWorld()
    .request()
    .observable.pipe(map(r => r.body.text));

  async deleteUser(userToDelete: User): Promise<void> {
    await this.userApiService.userController
      .deleteById(userToDelete.id)
      .request();
    this.refresh.next();
  }

  async addUser(): Promise<void> {
    const newUser = new User();
    newUser.name = `user-${Math.floor(Math.random() * 1000)}`;
    await this.userApiService.userController.save(newUser).request();
    this.refresh.next();
  }

  forceShowBaseRootApp = false;

  navigateTo(item: { path: string; label: string }): void {
    if (item.path === '/') {
      if (this.forceShowBaseRootApp) {
        return;
      }
      this.forceShowBaseRootApp = true;
      return;
    }
    this.forceShowBaseRootApp = false;
    this.router.navigateByUrl(item.path);
  }
}
//#endregion

```

</details>


<details>
<summary>ng-2-logger api service</summary>

```ts

//#region @browser
@Injectable({
  providedIn: 'root',
})
export class UserApiService extends TaonBaseAngularService {
  userController = this.injectController(UserController);

  getAll(): Observable<User[]> {
    return this.userController
      .getAll()
      .request()
      .observable.pipe(map(r => r.body.json));
  }
}
//#endregion

```

</details>


<details>
<summary>ng-2-logger routes</summary>

```ts
//#region @browser
export const Ng2LoggerServerRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
export const Ng2LoggerClientRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: () => {
      if (Ng2LoggerClientRoutes.length === 1) {
        return '';
      }
      return Ng2LoggerClientRoutes.find(r => r.path !== '')!.path!;
    },
  },
  // PUT ALL ROUTES HERE
  // @placeholder-for-routes
];
//#endregion
```

</details>


<details>
<summary>ng-2-logger app configs</summary>

```ts
//#region @browser
export const Ng2LoggerAppConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    {
      provide: TAON_CONTEXT,
      useFactory: () => Ng2LoggerContext,
    },
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: () => Ng2LoggerStartFunction,
    },
    provideBrowserGlobalErrorListeners(),
    // remove withHashLocation() to use SSR
    provideRouter(Ng2LoggerClientRoutes, withHashLocation()),
    provideClientHydration(withEventReplay()),
    provideServiceWorker('ngsw-worker.js', {
      enabled:
        !isDevMode() && !ENV_ANGULAR_NODE_APP_BUILD_PWA_DISABLE_SERVICE_WORKER,
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
};

export const Ng2LoggerServerConfig: ApplicationConfig = {
  providers: [provideServerRendering(withRoutes(Ng2LoggerServerRoutes))],
};

export const Ng2LoggerConfig = mergeApplicationConfig(
  Ng2LoggerAppConfig,
  Ng2LoggerServerConfig,
);
//#endregion
```

</details>


<details>
<summary>ng-2-logger entity</summary>

```ts
@TaonEntity({ className: 'User' })
class User extends TaonBaseAbstractEntity {
  //#region @websql
  @StringColumn()
  //#endregion
  name?: string;

  getHello(): string {
    return `hello ${this.name}`;
  }
}
```

</details>


<details>
<summary>ng-2-logger controller</summary>

```ts
@TaonController({ className: 'UserController' })
class UserController extends TaonBaseCrudController<User> {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  entityClassResolveFn = () => User;

  @GET()
  helloWorld(): Taon.Response<string> {
    //#region @websqlFunc
    return async (req, res) => 'hello world';
    //#endregion
  }

  @GET()
  getOsPlatform(): Taon.Response<string> {
    //#region @websqlFunc
    return async (req, res) => {
      //#region @backend
      return os.platform(); // for normal nodejs backend return real value
      //#endregion

      return 'no-platform-inside-browser-and-websql-mode';
    };
    //#endregion
  }
}
```

</details>


<details>
<summary>ng-2-logger migration</summary>

```ts

//#region @websql
@TaonMigration({
  className: 'UserMigration',
})
class UserMigration extends TaonBaseMigration {
  userController = this.injectRepo(User);

  async up(): Promise<any> {
    const superAdmin = new User();
    superAdmin.name = 'super-admin';
    await this.userController.save(superAdmin);
  }
}
//#endregion

```

</details>


<details>
<summary>ng-2-logger context</summary>

```ts
var Ng2LoggerContext = Taon.createContext(() => ({
  ...HOST_CONFIG['Ng2LoggerContext'],
  contexts: { TaonBaseContext },

  //#region @websql
  /**
   * In production use specyfic for this context name
   * generated migration object from  ./migrations/index.ts.
   */
  migrations: {
    UserMigration,
  },
  //#endregion

  controllers: {
    UserController,
  },
  entities: {
    User,
  },
  database: true,
  // disabledRealtime: true,
}));
```

</details>


<details>
<summary>ng-2-logger start function</summary>

```ts
export const Ng2LoggerStartFunction = async (
  startParams?: Taon.StartParams,
): Promise<void> => {
  demoTs();
  demoSimpleTs();

  await Ng2LoggerContext.initialize();

  //#region initialize auto generated active contexts
  const autoGeneratedActiveContextsForApp: TaonContext[] = [
    // @placeholder-for-contexts-init
  ];

  const priorityContexts = [
    // put here manual priority for contexts if needed
  ];

  const activeContextsForApp: TaonContext[] = [
    ...priorityContexts,
    ...autoGeneratedActiveContextsForApp.filter(
      c => !priorityContexts.includes(c),
    ),
  ];

  for (const activeContext of activeContextsForApp) {
    await activeContext.initialize();
  }
  //#endregion

  //#region @backend
  if (
    startParams?.onlyMigrationRun ||
    startParams?.onlyMigrationRevertToTimestamp
  ) {
    process.exit(0);
  }
  //#endregion

  //#region @backend
  console.log(`Hello in NodeJs backend! os=${os.platform()}`);
  //#endregion
};
```

</details>


<details>
<summary>default export</summary>

```ts
export default Ng2LoggerStartFunction;
```

</details>



