angular.module('userDataModule').controller('userDataController', ['$scope','userDataFactory','$window',
  function($scope, userDataFactory) { 
    
    
    $scope.create = function() {
      userDataFactory.create($scope.user);
    }

    $scope.login = function() {
      userDataFactory.login($scope.user);
    }
      
    $scope.google = function() {
        userDataFactory.google();
    }
  }     
]);
