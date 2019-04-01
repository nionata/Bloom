angular.module('announcementModule').controller('announcementController', ['$scope','announcementFactory','$window',
  function($scope, announcementFactory) { 
    
    $scope.announcements = announcementFactory.getAnnouncements().then(function(response){
      $scope.announcements = response.data;
    });

    $scope.approvedAnnouncements = announcementFactory.getApprovedAnnouncements().then(function(response){
      $scope.approvedAnnouncements = response.data;
    });

    $scope.testAnnounce = function() {
      console.log($scope.newAnnouncement);
    }

    $scope.like = function() {
      announcementFactory.like();
    }

    $scope.createAnnouncement = function(newAnnouncement) {
      console.log(newAnnouncement);
      announcementFactory.createAnnouncement(newAnnouncement);
    }

    $scope.deleteAnnouncement = function(postID) {
      announcementFactory.deleteAnnouncement(postID);
    }

    $scope.approveAnnouncement = function(postID) {
      announcementFactory.approveAnnouncement(postID);
    }
  }     
]);
