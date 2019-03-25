/* Dependencies */
var user = require('../controllers/user.server.controller.js'),
    googleurl =require('../config/google-util'),
    express = require('express'),
    router = express.Router();

//These method calls are responsible for routing requests to the correct request handler.
router.route('').get(user.getAll);
router.route('/:id').get(user.get)
                    .delete(user.delete);
router.route('/login').post(user.login);
router.route('/register').post(user.create);
router.route('/auth/google').get((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end(googleurl.CreateGoogleURL());
});
router.route('/auth/google-auth').get(user.creategoogleuser, (req, res) => {
     res.redirect('/');
});

module.exports = router;
