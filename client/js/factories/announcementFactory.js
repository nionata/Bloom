angular.module('announcementModule', []).factory('announcementFactory', function($http, $window) {
    var methods = {
        getAnnouncements: function(){
            return $http.get('/api/announcements');
        },

        //CHANGE TO /api/announcements/true
        getApprovedAnnouncements: function(){
            return $http.get('/api/announcements/?approved=true');
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

        getUserByID: function(id){
            return $http.get('/api/users/' + id);
        },

        like: function(){
            return $http.put('/api/announcements');
        }
    };

    return methods;
  });
  