/* Dependencies */
var events = require('../controllers/events.server.controller.js'),
    express = require('express'),
    router = express.Router();

//The ':' specifies a URL parameter.

router.route('/:id').get(events.geteventsbyid);

router.route('/').get(events.getevents,function(req, res){
res.json(res.locals.events);
});

router.route('/').post(events.createEvent,function(req, res){
});
router.route('/:id').delete(events.deleteEvent);



module.exports = router;