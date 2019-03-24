/* Dependencies */
var user = require('../controllers/user.server.controller.js'),
    googleurl =require('../config/google-util'),
    express = require('express'),
    router = express.Router();

//These method calls are responsible for routing requests to the correct request handler.
router.route('/login').post(user.login, function(req, res) {
    if(res.locals.log== true) {
      req.session.user = req.body.username;
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('success');
    } else {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('wrong username or password');
    }
});

router.route('/register').post(user.create,function(req, res){
    if(res.locals.success == true){
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('success');
    } else{
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('username already take');
    }
});

router.route('/google').get(function(req, res){
     res.writeHead(200, {'Content-Type': 'text/plain'});
     res.end(googleurl.urlGoogle());
});


router.route('/google-auth').get(user.creategoogleuser,(req, res) => {
     res.redirect('/dashboard');
});


//The ':' specifies a URL parameter.
router.route('/:Id')

module.exports = router;
