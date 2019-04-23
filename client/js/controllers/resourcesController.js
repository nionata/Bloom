angular.module('resourcesModule').controller('resourcesController', ['$scope','resourcesFactory',
  function($scope, resourcesFactory) {
    $scope.resources = resourcesFactory.getResources().then(function(response){
      console.log(response.data);
      $scope.resources = response.data;
    });
  }
]);
