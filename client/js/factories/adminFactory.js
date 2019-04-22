angular.module('adminModule', []).factory('adminFactory', function($http, $window) {
    var methods = {
        
      GetEventBydateRange: function(newEvent) {
        return $http.post('/api/admin/anaylics/',newEvent);
      },
      banUser: function(bannedUserId) {
        return $http.delete('/api/admin/', bannedUserId);
      },
      promoteUser: function(promoteUserID) {
        return $http.put('/api/admin/', promoteUserID);
      }

    };

    return methods;
  });
  

