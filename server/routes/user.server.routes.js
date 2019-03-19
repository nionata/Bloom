/* Dependencies */
var user = require('../controllers/user.server.controller.js'),
    express = require('express'),
    router = express.Router();

//These method calls are responsible for routing requests to the correct request handler.
router.route('/login').post(user.login);
router.route('/register').post(user.create);
router.route('/delete').post(user.delete);

//The ':' specifies a URL parameter.
router.route('/:Id')

module.exports = router;
