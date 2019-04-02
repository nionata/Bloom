angular.module('eventModule', []).factory('eventFactory', function($http, $window) {
  var methods = {
    getEvents: function(){
      return $http.get('/api/events/');
    },

    createEvent: function(newEvent) {
        return $http.post('/api/events', newEvent);
      },

    deleteEvent: function(eventID) {
        return $http.delete('/api/events/' + eventID);
      },

    approveEvent: function(postID) {
        return $http.put('/api/events/' + postID);
      },

    getUserByID: function(id){
        return $http.get('/api/users/' + id);
      }
  }

  return methods;
});
