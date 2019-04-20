/* register the modules the application depends upon here*/
angular.module('userDataModule', []);
angular.module('eventModule', []);
angular.module('announcementModule', []);
angular.module('bioDataModule', []);

/* register the application and inject all the necessary dependencies */
var app = angular.module('app', ['announcementModule', 'eventModule', 'userDataModule', 'bioDataModule']);