// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBTg9HFMxYTy0ox8bcxdMvLqpnu6FPJ7e8',
    authDomain: 'ngdms-app.firebaseapp.com',
    databaseURL: 'https://ngdms-app.firebaseio.com',
    projectId: 'ngdms-app',
    storageBucket: 'ngdms-app.appspot.com',
    messagingSenderId: '777629318299'
  }
};
