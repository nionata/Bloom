/* Dependencies */
var express = require('express'),
    user = require('../controllers/user.server.controller.js'),
    googleurl =require('../config/google-util'),
    router = express.Router();

//These method calls are responsible for routing requests to the correct request handler.
router.route('/').get((req, res) => {
  res.sendFile('/client/index.html', { root: '.'});
});

router.route('/login').get((req, res) => {
  res.sendFile('/client/login.html', { root: '.'});
});

router.route('/register').get((req, res) => {
  res.sendFile('/client/register.html', { root: '.'});
});



module.exports = router;
