angular.module('userDataModule', []).factory('userDataFactory', function($http, $window) {
  var methods = {

    getBio: function(){
      return $http.get('/api/users/user');
    },
    getUsers: function(){
      return $http.get('/api/users/');
    },

    create: function(user) {
      return $http.post('/api/users/register', user).success(function(data, status, headers, config) {
          // if the response is data is success then redirect to the login otherwise send a message
          if(data instanceof Object) {
            $window.location=('bio');
          } else {
            alert(data);
          }
      })
    },
    login: function(user) {
      return $http.post('/api/users/login', user).success(function(data, status, headers, config) {
        // if the response is data is success then redirect to the dashboard otherwise send a message
        if(data === "User signed in successfully") {
          $window.location=('/');
        } else {
          alert(data);
        }
      })
    },
    google: function() {
      return $http.get('/api/users/auth/google').success(function(data, status, headers, config) {
        $window.location=(data);
      })
    }
  };

  return methods;
});
