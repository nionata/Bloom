angular.module('resourceModule', []).factory('resourceFactory', function($http, $window) {
    var methods = {
      getResources: function(){
        return $http.get('/api/resources/');
      },
  
      createResource: function(newResource) {
          return $http.post('/api/resources/create', newResource);
        },
  
      deleteResource: function(resourceID) {
          return $http.delete('/api/resources/' + resourceID);
        }
  
    }
  
    return methods;
  });
  