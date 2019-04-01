angular.module('announcementModule').controller('announcementController', ['$scope','announcementFactory','$window',
  function($scope, announcementFactory) { 
    
    $scope.announcements = announcementFactory.getAnnouncements().then(function(response){
      $scope.announcements = response.data;
    });

    $scope.approvedAnnouncements = announcementFactory.getApprovedAnnouncements().then(function(response){
      $scope.approvedAnnouncements = response.data;
    });

    $scope.unapprovedAnnouncements = announcementFactory.getUnapprovedAnnouncements().then(function(response){
      $scope.unapprovedAnnouncements = response.data;
    });

    $scope.testAnnounce = function() {
      console.log($scope.newAnnouncement);
    }

    $scope.like = function() {
      announcementFactory.like();
    }

    $scope.createAnnouncement = function(newAnnouncement) {
      $("#suggestTitle").val('');
      $("#suggestContent").val('');
      announcementFactory.createAnnouncement(newAnnouncement);
    }

    $scope.deleteAnnouncement = function(postID) {
      review = {"review": false};
      announcementFactory.deleteAnnouncement(postID, review);
    }

    $scope.approveAnnouncement = function(postID) {
      review = {"review": true};
      announcementFactory.approveAnnouncement(postID, review);
    }
  }     
]);
