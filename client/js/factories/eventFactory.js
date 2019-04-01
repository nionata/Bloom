angular.module('eventModule', []).factory('eventFactory', function($http, $window) {
  var methods = {
    getEvents: function(){
      return $http.get('/api/events/');
    },

    getApprovedEvents: function(){
      return $http.get('/api/events/?approved=true');
    },

    createEvent: function(newEvent) {
        return $http.post('/api/events/', newEvent);
      },

    deleteEvent: function(postID, review) {
        return $http.put('/api/events/' + postID +"/review", review);
      },

    approveEvent: function(postID, review) {
        return $http.put('/api/announcements/' + postID +"/review", review);
      },

    getUserByID: function(id){
        return $http.get('/api/users/' + id);
      }
  }

  return methods;
});
