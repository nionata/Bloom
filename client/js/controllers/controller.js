//Replace moduleName //Replace controller //Import factoryName
angular.module('moduleName').controller('controller', ['$scope','factoryName','$window',
  function($scope,factoryName) {
      
  $scope.create = function() {
	  factoryName.create($scope.user);
}
  
   $scope.login = function() {
	  factoryName.login($scope.user);
}
}
      
      
]);
