angular.module('adminModule').controller('adminController', ['$scope','adminFactory','$window',
  function($scope, adminFactory) { 
    $scope.myJson = {
        type : "bar",
        title:{
          backgroundColor : "transparent",
          fontColor :"black",
          text : "Bar Chart"
        },
        backgroundColor : "white",
        series : [
          {
            values : [1,2,3,4],
            backgroundColor : "#4DC0CF"
          }
        ]
      };
  }     
]);
