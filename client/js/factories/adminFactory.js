angular.module('adminModule', []).factory('adminFactory', function($http, $window) {
    var methods = {
        
        GetEventBydateRange: function(newEvent) {
        return $http.post('/api/admin/anaylics/',newEvent);
      }

    };

    return methods;
  });
  

