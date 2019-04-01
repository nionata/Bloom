angular.module('eventModule').controller('eventController', ['$scope','eventFactory','$window',
  function($scope, eventFactory) { 
    $scope.events = eventFactory.getEvents().then(function(response){
      $scope.events = response.data;
    });

    $scope.createEvent = function(newEvent) {
      console.log(newEvent);
      eventFactory.createEvent(newEvent);
    }

    $scope.deleteEvent = function(eventID) {
      eventFactory.deleteEvent(eventID);
    }
  }
]);
