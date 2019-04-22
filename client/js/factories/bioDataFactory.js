angular.module('bioDataModule', []).factory('bioDataFactory', function($http, $window) {
    var methods = {
  
      getBio: function(){
        return $http.get('/api/users/user/bio');
      },
  
     createBio: function(bio) {
        return $http.post('/api/users/user/bio', bio);
      },

      updateBio: function(bio) {
        return $http.put('/api/users/user/bio', bio);
      }
    };
  
    return methods;
  });
  