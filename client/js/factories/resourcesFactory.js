angular.module('resourcesModule', []).factory('resourcesFactory', function($http, $window) {
  var methods = {
    getResources: function(){
      return $http.get('/api/resources');
    }
  };
  return methods;
});
