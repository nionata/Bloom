angular.module('userDataModule').controller('userDataController', ['$scope','userDataFactory','$window',
  function($scope, userDataFactory) { 
    
    $scope.bio = userDataFactory.getBio().then(function(response){
      $scope.bio = response.data;
    });
    
    $scope.test = function() {
      console.log($scope.bio.username);
    }
    

    $scope.create = function() {
      userDataFactory.create($scope.user);
    }

    $scope.login = function() {
      userDataFactory.login($scope.user);
    }
      
    $scope.google = function() {
        userDataFactory.google();
    }

    $scope.users = userDataFactory.getUsers().then(function(response){
      $scope.users = response.data;
      console.log($scope.users);
    });
  }     
]);
