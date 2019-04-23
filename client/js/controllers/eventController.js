angular.module('eventModule').controller('eventController', ['$scope','eventFactory','$window',
  function($scope, eventFactory) { 
    
    $scope.events = eventFactory.getEvents().then(function(response){
      $scope.events = response.data;
    });

    $scope.createEvent = function(newEvent) { 
      newEvent.eventend = new Date(newEvent.eventend.toISOString());
      newEvent.startend = new Date(newEvent.eventstart.toISOString());
      $("#suggestEventTitle").val('');
      $("#suggestEventContent").val('');
      $("#suggestEventStart").val('');
      $("#suggestEventEnd").val('');
      eventFactory.createEvent(newEvent);
      alert("Created Event. Now Waiting on Admin Approval.")
    }

    $scope.deleteEvent = function(eventID) {
      eventFactory.deleteEvent(eventID);
    }

    $scope.approveEvent = function(eventID) {
      eventFactory.approveEvent(eventID);
    }
     
    $scope.users = eventFactory.getUsers().then(function(response){
      $scope.users = response.data;
    });
  }
]);
