# ChatBoothExt

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.9.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Build using chrom config => Mac Or Windows

## package.json config for Mac: `"build:chrome": "ng build --configuration production && cp src/manifest.json dist/chat-booth-ext/browser/manifest.json && cp -r src/chrome dist/chat-booth-ext/browser"`

## package.json config for Windows: `"build:chrome": "ng build --configuration production && copy src\\manifest.json dist\\chat-booth-ext\\browser\\manifest.json && xcopy src\\chrome dist\\chat-booth-ext\\browser\\chrome /E /I /Y"`

Run `npm run build:chrome`

## Git pull(update master to latest) => Mac Or Windows

## Git pull on Mac: 
Run `git pull --rebase origin master`

## Git pull on Windows: 
Run `git fetch origin` than `git reset --hard origin/master`

## Run webpack config

Run `npx webpack --config webpack.config.js`

## Manually remove local-storage user credentials

In "service worker"(background.js) dev-tools console, Run: `chrome.storage.local.remove(['uid', 'idToken'])` 
