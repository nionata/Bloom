
/* Dependencies */
const { Client } = require('pg');
const uri = require('../config/config.js');
express = require('../config/express.js');

exports.getevents = async function(req, res, next) {
    // conncects to postres server
    const client = new Client({connectionString: uri.db.uri,ssl: true,});
    await client.connect();
    var events = await client.query('select * from events');
    res.locals.events = events.rows;
    await client.end();
    next();
};


exports.geteventsbyid = async function(req, res, next) {
    // conncects to postres server
    const client = new Client({connectionString: uri.db.uri,ssl: true,});
    await client.connect();
    var events = await client.query('select * from events where eventid=$1',[req.params.id]);
    await client.end();
    if(events.rowCount !== 0) {
          res.json(events.rows[0]);
        } else {
          res.send("Invalid event id");
        }
};



exports.approveEvent = async function(req, res, next) {
    // conncects to postres server
    const client = new Client({connectionString: uri.db.uri,ssl: true,});
    await client.connect();
    var events = await client.query('update events set approved = true where eventid=$1 RETURNING *',[req.params.id]);
    await client.end();
    if(events.rowCount !== 0) {
          res.json(events.rows[0]);
        } else {
          res.send("Invalid event id");
        }
};

exports.createEvent = async function(req, res, next) {
    // conncects to postres server
    var datetime = new Date();
    const client = new Client({connectionString: uri.db.uri,ssl: true,});
    await client.connect();
    client.query('INSERT INTO events(eventtitle, eventcontent,userid,eventstart,eventend,approved,date_created) values($1, $2, $3, $4,$5,$6,$7) RETURNING *', [req.body.eventtitle, req.body.eventcontent, req.session.user_id, req.body.eventstart,req.body.eventend,false,datetime], (err, result) => {
               client.end();
                if(err) {
                  console.log(err);
                  res.status(400).send(err);
                } else {    
                  res.send(result.rows[0]);
                }
              });
};

exports.deleteEvent = async function(req, res, next) {
    // conncects to postres server
    const client = new Client({connectionString: uri.db.uri,ssl: true,});
    await client.connect();
    client.query('Delete from events where eventid = $1', [req.params.id], (err, result) => {
               client.end();
                if(err) {
                  console.log(err);
                  res.status(400).send(err);
                } else {
                  res.sendStatus(200);
                }
              });
};