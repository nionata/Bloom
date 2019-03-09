angular.module('moduleName', []).factory('factoryName', function($http, $window) {
  var methods = {
      create: function(user) {
	  return $http.post('http://localhost:8080/reg', user).success(function(data, status, headers, config) {
          // if the response is data is success then redirect to the login otherwise send a message
            if(data == "success"){
                 $window.location=('login');   
            }else
            {
                alert(data);
            }
  })
    },
      
      login: function(user) {
	  return $http.post('http://localhost:8080/login', user).success(function(data, status, headers, config) {
          // if the response is data is success then redirect to the dashboard otherwise send a message
            if(data == "success"){
                 $window.location=('dashboard');   
            }else
            {
                alert(data);
            }
  })
    }
  };

  return methods;
});
