/* Dependencies */
var express = require('express'),
    user = require('../controllers/user.server.controller.js'),
    googleurl =require('../config/google-util'),
    router = express.Router();

//These method calls are responsible for routing requests to the correct request handler.
router.route('/').get((req, res) => {
  res.sendFile('/client/home.html', { root: '.'});
});

router.route('/login').get((req, res) => {
  res.sendFile('/client/login.html', { root: '.'});
});

router.route('/register').get((req, res) => {
  res.sendFile('/client/register.html', { root: '.'});
});

router.route('/admin').get((req, res) => {
    if(req.session.admin){
        res.sendFile('/admin/admin.html', { root: '.'});
        }else
        {
            res.sendFile('/client/notfound.html', { root: '.'});
        }
});

router.route('/admin-event').get((req, res) => {
  if(req.session.admin){
      res.sendFile('/admin/admin-event.html', { root: '.'});
      }else
      {
          res.sendFile('/client/notfound.html', { root: '.'});
      }
});

router.route('/admin-announcement').get((req, res) => {
  if(req.session.admin){
      res.sendFile('/admin/admin-announcement.html', { root: '.'});
      }else
      {
          res.sendFile('/client/notfound.html', { root: '.'});
      }
});

router.route('/admin-controls').get((req, res) => {
  if(req.session.admin){
      res.sendFile('/admin/admin-controls.html', { root: '.'});
      }else
      {
          res.sendFile('/client/notfound.html', { root: '.'});
      }
});

router.route('/admin-resource').get((req, res) => {
  if(req.session.admin){
      res.sendFile('/admin/admin-resource.html', { root: '.'});
      }else
      {
          res.sendFile('/client/notfound.html', { root: '.'});
      }
});

router.route('/anaylics').get((req, res) => {
  if(req.session.admin){
      res.sendFile('/admin/badmin-anayltics.html', { root: '.'});
      }else
      {
          res.sendFile('/client/notfound.html', { root: '.'});
      }
});

router.route('/404').get((req, res) => {
  res.sendFile('/client/notfound.html', { root: '.'});
});

router.route('/bio').get((req, res) => {
  res.sendFile('/client/bio.html', { root: '.'});
});

router.route('/about').get((req, res) => {
  res.sendFile('/client/about.html', { root: '.'});
});

router.route('/resources').get((req, res) => {
  res.sendFile('/client/resources.html', { root: '.'});
});

router.route('/events').get((req, res) => {
  res.sendFile('/client/events.html', { root: '.'});
});

router.route('/profile').get((req, res) => {
  res.sendFile('/client/bio.html', { root: '.'});
});

router.route('/bio').get((req, res) => {
  res.sendFile('/client/bio.html', { root: '.'});
});

router.route('/announcements').get((req, res) => {
  res.sendFile('/client/announcements.html', { root: '.'});
});


module.exports = router;
