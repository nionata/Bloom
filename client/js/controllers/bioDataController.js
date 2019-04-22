angular.module('bioDataModule').controller('bioDataController', ['$scope','bioDataFactory','$window',
  function($scope, bioDataFactory) { 
    
    $scope.bio = bioDataFactory.getBio().then(function(response){
      $scope.bio = response.data;
    });
    
    $scope.test = function() {
      console.log($scope.bio.username);
    }

    $scope.create = function() {
     bioDataFactory.createBio($scope.bio);
    }
    
    $scope.update = function() {
        bioDataFactory.updateBio($scope.bio);
       }

  
  }     
]);
