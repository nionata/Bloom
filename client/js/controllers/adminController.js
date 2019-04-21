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
            values : [1,2,3,7],
            backgroundColor : "#4DC0CF"
          }
        ]
      };
      
       $scope.DateEvent = function(newEvent) {
      newEvent.eventend = new Date(newEvent.eventend.toISOString());
      newEvent.startend = new Date(newEvent.eventstart.toISOString());
      adminFactory.GetEventBydateRange(newEvent).then(function(response){
      $scope.myJson.series.values = response.data[1];
      console.log($scope.myJson.series.values);
    });
    }
       
  }     
]);
