/* Dependencies */
var express = require('express'),
    router = express.Router();

//These method calls are responsible for routing requests to the correct request handler.
router.route('/').get((req, res) => {
  res.sendFile('/client/index.html', { root: '.'});
});

router.route('/login').get((req, res) => {
  res.sendFile('/client/login.html', { root: '.'});
});

//check if login in and route to dash board
router.route('/dashboard').get((req, res) => {
  res.sendFile('/client/dashboard.html', { root: '.'});
});

module.exports = router;
