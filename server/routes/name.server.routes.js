/* Dependencies */
var name = require('../controllers/auth.server.controller.js'), //Replace with controller name
    express = require('express'),
    router = express.Router();

//These method calls are responsible for routing requests to the correct request handler.
router.route('/')

//The ':' specifies a URL parameter.
router.route('/:Id')

module.exports = router;
