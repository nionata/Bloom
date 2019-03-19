/* Dependencies */
var announcements = require('../controllers/announcements.server.controller.js'),
    express = require('express'),
    router = express.Router();

//The ':' specifies a URL parameter.
router.route('/:Id')

module.exports = router;
