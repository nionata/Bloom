/* Dependencies */
var resources = require('../controllers/resources.server.controller.js'),
    express = require('express'),
    router = express.Router();

//These method calls are responsible for routing requests to the correct request handler.
router.route('').get(resources.getAll);
router.route('/:id').get(resources.getById)
                   .delete(resources.delete);
router.route('/create').post(resources.create);

module.exports = router;
