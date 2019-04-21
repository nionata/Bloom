/* register the modules the application depends upon here*/
angular.module('userDataModule', []);
angular.module('eventModule', []);
angular.module('announcementModule', []);
angular.module('adminModule', []);
angular.module('zingchart-angularjs', []);

/* register the application and inject all the necessary dependencies */
var app = angular.module('app', ['zingchart-angularjs', 'announcementModule', 'eventModule', 'userDataModule', 'adminModule']);