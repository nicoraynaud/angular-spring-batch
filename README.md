# Angular Spring Jobs

Cette librairie expose un composant permettant l'affichage et le lancement de
jobs Spring Batch d'une application Spring Boot.

## Compatibilité JHipster


| JHipster      | angular-spring-batch |
| ------------- | ---------------- |
|  *            | 2.0.x
|  5.x          | 1.7.x            |
|  4.14.x       | 1.6.x            |
|  4.13.x       | 1.5.x            |


## Prérequis

- 2.0.x
  - `bootstrap` `4.1.0`
  - `@angular/*` `^6.0.0`
  - `@angular/cli` `^6.0.3`

- 1.x.x
  - `bootstrap` `4.1.0`
  - `@angular/*` `^5.2.11`
  - `@angular/cli` `^1.7.4`

## Installation et intégration

### Installation

Installer la dépendence avec `yarn` :

```bash
yarn add angular-spring-batch
```

Pour les applications angular 5, il est nécessaire d'installer la dépendence `rxjs-compat` :

```bash
yarn add rxjs-compat
```

### Intégration

Intégrer le module `AngularSpringBatch` (par exemple, dans le module `AdminModule`
pour les applications JHipster) :

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

Définir la route (dans le fichier `admin.routes.ts` pour les applications
JHipster) :

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

### Traduction

Si besoin rajouter le fichier `jobs.json` pour la traduction du titre de la
page :

```json
{
  "jobs": {
    "title": "Jobs"
  }
}
```

### Intégration HTML

Il suffit de rajouter un lien vers la page `/admin/jobs` (par exemple dans le
fichier `navbar.component.html` pour les applications JHipster) :

```html
<li>
    <a class="dropdown-item" routerLink="admin/jobs" routerLinkActive="active" (click)="collapseNavbar()">
        <fa-icon [icon]="['fa', 'clock']" [fixedWidth]="true"></fa-icon>
        <span>Jobs</span>
    </a>
</li>
```

## Build et distribution

### Build

```bash
$ npm install
$ npm run build
```

### Test locally

Le script suivant lance un ng serve ainsi qu'un petit proxy pour rediriger le traffic /api et /management vers localhost:8080.
Voir proxy.conf.json pour modifier.

```bash
$ npm run start
```

### Package

```bash
$ npm run packagr
```

### Distribution

```bash
$ cd dist/angular-spring-batch
$ npm publish dist/angular-spring-batch
```
