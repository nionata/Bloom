angular.module('announcementModule', []).factory('announcementFactory', function($http, $window) {
    var methods = {
        getAnnouncements: function(){
            return $http.get('/api/announcements');
        },

        getApprovedAnnouncements: function(){
            return $http.get('/api/announcements/?approved=true');
        },

        getUnapprovedAnnouncements: function(){
            return $http.get('/api/announcements/?approved=false');
        },

        createAnnouncement: function(newAnnouncement) {
            return $http.post('/api/announcements/create', newAnnouncement);
        },

        deleteAnnouncement: function(postID, review) {
            return $http.put('/api/announcements/' + postID +"/review", review);
        },

        approveAnnouncement: function(postID, review) {
            return $http.put('/api/announcements/' + postID +"/review", review);
        },

        getUsers: function(){
            return $http.get('/api/users/');
          },

        like: function(){
            return $http.put('/api/announcements');
        }
    };

    return methods;
  });
  