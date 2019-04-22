angular.module('bioDataModule').controller('bioDataController', ['$scope','bioDataFactory','$window',
  function($scope, bioDataFactory, $window) { 

    
    $scope.bio = bioDataFactory.getBio().then(function(response){
      if (typeof response.data != 'object'){
      $scope.bio = null;
      console.log(response.data);
      }
      else {
        $scope.bio = response.data;
        console.log(response.data);
      }
    });
 
    $scope.create = function() {
      console.log("checkpoint reached");
      console.log($scope.newBio);
     bioDataFactory.createBio($scope.newBio);
     $window.location.reload(true); 
    }
    
    $scope.update = function() {
        bioDataFactory.updateBio($scope.updatedBio);
        $window.location.reload(true); 
       }

  
  }     
]);
