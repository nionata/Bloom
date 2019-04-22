/* Dependencies */
var admin = require('../controllers/admin.server.controller.js'),
    express = require('express'),
    router = express.Router();

//The ':' specifies a URL parameter.
router.route('/anaylics').post(admin.getAll);
router.route('/ban/:id').get(admin.Ban);
router.route('/Promote/:id').get(admin.Promote);

module.exports = router;
