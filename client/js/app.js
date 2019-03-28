/* register the modules the application depends upon here*/
angular.module('userDataModule', []);

/* register the application and inject all the necessary dependencies */
var app = angular.module('app', ['userDataModule']);