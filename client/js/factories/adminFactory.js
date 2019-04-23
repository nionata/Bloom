angular.module('adminModule', []).factory('adminFactory', function($http, $window) {
    var methods = {
        
      GetEventBydateRange: function(newEvent) {
        return $http.post('/api/admin/anaylics/',newEvent);
      },
      banUser: function(bannedUserId) {
        return $http.get('/api/admin/ban/'+ bannedUserId);
      },
      promoteUser: function(promoteUserID) {
        return $http.get('/api/admin/Promote/'+ promoteUserID);
      },
      demoteUser: function(demoteUserID) {
        return $http.get('/api/admin/Demote/'+ demoteUserID);
      },
      getUsers: function(){
        return $http.get('/api/users/');
      }

    };

    return methods;
  });
  

