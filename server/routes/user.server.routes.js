/* Dependencies */
var user = require('../controllers/user.server.controller.js'),
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

//The ':' specifies a URL parameter.
router.route('/:Id')

module.exports = router;
