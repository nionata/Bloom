/* Dependencies */
var events = require('../controllers/events.server.controller.js'),
    express = require('express'),
    router = express.Router();

//The ':' specifies a URL parameter.
router.route('/:Id')

module.exports = router;
