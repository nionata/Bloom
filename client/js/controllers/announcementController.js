angular.module('announcementModule').controller('announcementController', ['$scope','announcementFactory','$window',
  function($scope, announcementFactory) { 
    
    $scope.announcements = announcementFactory.getAnnouncements().then(function(response){
      $scope.announcements = response.data;
    });

    $scope.testAnnounce = function() {
      console.log($scope.newAnnouncement);
    }

    $scope.like = function() {
      announcementFactory.like();
    }

    $scope.createAnnouncement = function() {
      announcementFactory.createAnnouncement($scope.newAnnouncement);
    }
  }     
]);
