angular.module('resourcesModule').controller('resourcesController', ['$scope','resourcesFactory',
  function($scope, resourcesFactory) {
    $scope.resources = resourcesFactory.getResources().then(function(response) {
      var resources = response.data;

      if(resources === "Missing authentication") {
        return;
      }

      resources.forEach((resource) => {
        let link = resource.link;
        let videoId = link.substring(resource.link.indexOf("embed") + 6);
        let thumbnail = "https://i.ytimg.com/vi/" + videoId + "/mqdefault.jpg";

        resource.videoId = videoId;
        resource.thumbnail = thumbnail;
      });

      $scope.resources = resources;
    });
  }
]);
