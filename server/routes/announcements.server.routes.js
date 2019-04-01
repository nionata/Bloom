/* Dependencies */
var announcements = require('../controllers/announcements.server.controller.js'),
    express = require('express'),
    router = express.Router();

//These method calls are responsible for routing requests to the correct request handler.
router.route('').get(announcements.getAll);
router.route('/:id').get(announcements.getById)
                    .delete(announcements.delete);
router.route('/:id/like').put(announcements.like);
router.route('/:id/review').put(announcements.review)
router.route('/create').post(announcements.create);

module.exports = router;
