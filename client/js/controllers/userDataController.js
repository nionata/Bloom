//Replace moduleName //Replace controller //Import factoryName
angular.module('userDataModule').controller('userDataController', ['$scope','userDataFactory','$window',
  function($scope,factoryName) {
      
  $scope.create = function() {
	  factoryName.create($scope.user);
}
  
   $scope.login = function() {
	  factoryName.login($scope.user);
}
   
    $scope.google = function() {
	  factoryName.google();
}
}
      
      
]);
