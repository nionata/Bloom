angular.module('adminModule').controller('adminController', ['$scope','adminFactory','$window',
  function($scope, adminFactory) { 
      
    $scope.banUser = function(bannedUserID) {
      adminFactory.banUser(bannedUserID);
      alert("Banned User With ID: " + bannedUserID);
    }

    $scope.promote = function(promoteUserID) {
      adminFactory.promoteUser(promoteUserID);
      alert("Promoted User With ID: " + promoteUserID);
    }

    $scope.demote = function(demoteUserID) {
      adminFactory.demoteUser(demoteUserID);
      alert("Demoted User With ID: " + demoteUserID);
    }

    $scope.users = adminFactory.getUsers().then(function(response){
      $scope.users = response.data;
      console.log($scope.users);
    });

       $scope.myJson = {
        type : "line",
        title:{
          backgroundColor : "transparent",
          fontColor :"black",
          text : "Analytics"
        },
        backgroundColor : "white",
        series : [
          {
            
            backgroundColor : "#4DC0CF"
          }
        ]
      };
   
      
       $scope.DateEvent = function(newEvent) {
           
    
           
      newEvent.eventend = new Date(newEvent.eventend.toISOString());
      newEvent.startend = new Date(newEvent.eventstart.toISOString());
      adminFactory.GetEventBydateRange(newEvent).then(function(response){
          
          $scope.myJson = {
        type : "line",
            "legend":{
    
  },
        scaleX: {
    minValue: newEvent.startend.valueOf(),
    step: 'day',
    transform: {
      type: 'date',
      all: '%M %d'
    },
    item: {
      fontSize: 10
    },
    maxItems: 13,
    
    zooming: true,
    zoomToValues: [1422910800000,1430427600000],
    guide: {
      alpha: 1,
      lineStyle: 'solid',
      visible: true
    },
    minorTicks: 7,
    minorGuide: {
      alpha: 0.7,
      lineStyle: 'dotted'
    }
  },
        title:{
          backgroundColor : "transparent",
          fontColor :"black",
          text : "Analytics"
        },
        backgroundColor : "white",
        series : []
      };
          
          console.log(response.data);
      $scope.myJson.series.values = response.data[1];
          $scope.myJson.series.pop();
          values = response.data[0];
          $scope.myJson.series.push({"values" : values , "text" : "event creates"});
          values = response.data[1];
           $scope.myJson.series.push({"values" : values , "text" : "logins"});
          values = response.data[2];
           $scope.myJson.series.push({"values" : values , "text" : "account requests"});
          values = response.data[3];
          $scope.myJson.series.push({"values" : values , "text" : "announcement requests"});
          zingchart.render($scope.myJson);
    });
    }
       
  }     
]);
