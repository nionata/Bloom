angular.module('resourceModule').controller('resourceController', ['$scope','resourceFactory','$window',
  function($scope, resourceFactory) { 
    $scope.resources = resourceFactory.getResources().then(function(response){
      $scope.resources = response.data;
    });

    $scope.createResource = function(newResource) { 
      $("#title").val('');
      $("#link").val('');
      $("#category").val('');
      $("#description").val('');
      console.log(newResource);
      resourceFactory.createResource(newResource);
    }

    $scope.deleteResource = function(resourceID) {
      resourceFactory.deleteResource(resourceID);
    }
  }
]);
