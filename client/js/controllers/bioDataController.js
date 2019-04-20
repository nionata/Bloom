angular.module('bioDataModule').controller('bioDataController', ['$scope','bioDataFactory','$window',
  function($scope, bioDataFactory, $window) { 

    /*
http://localhost:8080/api/users/user/bio

http://localhost:8080/api/users/user/bio
{
    “firstName”: “Nicholas”,
    “lastName”: “Ionata”,
    “affiliation”: “Individual”,
    “bio”: “I like avacados”
}
    */
    
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
    
    $scope.test = function() {
      console.log($scope.bio.username);
    }

    $scope.create = function() {
      console.log("checkpoint reached");
      console.log($scope.newBio);
     bioDataFactory.createBio($scope.newBio);
     $window.location.reload(true); 
    }
    
    $scope.update = function() {
        bioDataFactory.updateBio($scope.bio);
       }

  
  }     
]);
