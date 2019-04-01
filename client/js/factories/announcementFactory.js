angular.module('announcementModule', []).factory('announcementFactory', function($http, $window) {
    var methods = {
        getAnnouncements: function(){
            return $http.get('/api/announcements');
        },

        createAnnouncement: function(newAnnouncement) {
            console.log(newAnnouncement);
            return $http.post('/api/announcements/create', newAnnouncement);
        },

        like: function(){
            return $http.put('/api/announcements');
        }
    };

    return methods;
  });
  