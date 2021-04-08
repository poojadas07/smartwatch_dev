// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // serverBaseUrl: 'http://ec2-3-141-250-88.us-east-2.compute.amazonaws.com:8080/smartwatch/',
  serverBaseUrl: 'http://ec2-18-222-182-155.us-east-2.compute.amazonaws.com:8080/smartwatch/',
  // serverBaseUrl: 'http://localhost:8080/smartwatch/',

  firebaseConfig: {
    apiKey: 'AIzaSyAi3PnI1XHLbUx-1P1Vok4Db8QCdyg7QVE',
    authDomain: 'angular-backend-admin-demo.firebaseapp.com',
    databaseURL: 'https://angular-backend-admin-demo.firebaseio.com',
    projectId: 'angular-backend-admin-demo',
    storageBucket: 'angular-backend-admin-demo.appspot.com',
    messagingSenderId: '224493076459',
    appId: '1:224493076459:web:4bf1fbf3a11b4c1a7323ae',
    measurementId: 'G-6JQGLWH0EL'
  }
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
