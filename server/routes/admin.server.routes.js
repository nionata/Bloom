/* Dependencies */
var admin = require('../controllers/admin.server.controller.js'),
    express = require('express'),
    router = express.Router();

//The ':' specifies a URL parameter.
router.route('/logins').get(admin.getUserLogins);
router.route('/created').get(admin.getUsersCreated);
router.route('/events').get(admin.getEventsCreated);
router.route('/announcements').get(admin.getannouncementsCreated);

module.exports = router;
