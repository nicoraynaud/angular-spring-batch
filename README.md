# Angular Spring Batch

This lib makes a series of component availables to manage Spring Batch jobs form an Angular Front-End.

You can search, list, start, stop and analyse results of spring batch jobs within an Angular app.

This lib is meant to be used with the backend lib for exposing Spring Batch REST API : [spring-batch-rest-api](https://github.com/nicoraynaud/spring-batch-rest-api).


## Authors

This lib was developed by the following persons (if any co-author wants, I can add his full name and github or personal page link right here) :
- Jérome
- Alexis
- Noémie
- Kilian
- Nicolas (me)

## Screenshots

![admin/jobs page](https://user-images.githubusercontent.com/184581/57590024-d4a6f880-74f6-11e9-8319-cbc802b190b0.png "Logo The Jobs component")

![details](https://user-images.githubusercontent.com/184581/57590072-1e8fde80-74f7-11e9-95b1-7a536de8bf02.png "A Job execution detail")


## JHipster compatibility

| JHipster    | angular-spring-batch |
|-------------|----------------------|
| 5.x         | 1.x.x                |
| 6.x         | 2.x.x                |
| 7.x - 7.3.x | 3.x.x                |
| 7.4.x - +   | 4.x.x                |


## Prerequisites

- You need at least the following libs and versions for this lib to work
  - `bootstrap` `4.6.1`
  - `@angular/*` `13.1.1`
  - `@angular/cli` `13.1.2`


## Install and integrate

### Install

Install with `yarn` :

```bash
yarn add angular-spring-batch
```
or `npm`

```bash
npm install angular-spring-batch
```

For Angular 5, the following dependency is also needed :

```bash
yarn add rxjs-compat
```

### HOw to use

Add the `SpringBatchModule` module in your app (for example, in JHipster, import it in the `AdminModule` module)

```typescript
import { SpringBatchModule } from 'angular-spring-batch';

@NgModule({
  imports: [
    ...
    SpringBatchModule,
    ...
  ],
})
export class AdminModule {
}
```

### Route

Define the following route : (for JHipster, you can do it in the `admin.routes.ts` file) :

```typescript
import { SpringBatchComponent } from 'angular-spring-batch';

const jobsRoute: Route = {
    path: 'jobs',
    component: SpringBatchComponent,
    data: {
        pageTitle: 'jobs.title'
    }
};

const ADMIN_ROUTES = [auditsRoute, configurationRoute, docsRoute, healthRoute, logsRoute, metricsRoute, jobsRoute];

...
```

### Translation (JHipster specific)

If needed, you can add a i18N translations in `jobs.json` :

```json
{
  "jobs": {
    "title": "Jobs"
  }
}
```

### In a template

You then just need to add a link to `/admin/jobs` (for example, in JHipster, you can do it in `navbar.component.html`) :

```html
<li>
    <a class="dropdown-item" routerLink="admin/jobs" routerLinkActive="active" (click)="collapseNavbar()">
        <fa-icon [icon]="['fa', 'clock']" [fixedWidth]="true"></fa-icon>
        <span>Jobs</span>
    </a>
</li>
```

## Build and distribute

### Build

```bash
$ npm install
$ npm run build
```

### Test locally

The following script starts `ng serve` as well as a proxy conf that redirects any traffic to `/api` and `/management` toward localhost:8080.
See proxy.conf.json to change this.

```bash
$ npm run start
```

### Package

```bash
$ npm run packagr
```

### Distribute

```bash
$ cd dist/angular-spring-batch
$ npm publish
```
