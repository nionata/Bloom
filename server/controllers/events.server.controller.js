
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
    res.json(events.rows);
};

exports.createEvent = async function(req, res, next) {
    // conncects to postres server
    const client = new Client({connectionString: uri.db.uri,ssl: true,});
    await client.connect();
    client.query('INSERT INTO events(eventtitle, eventcontent,adminid,userid,eventstart,eventend,approved) values($1, $2, $3, $4,$5,$6,$7) RETURNING *', [req.body.eventtitle, req.body.eventcontent, req.body.adminid, req.body.userid,req.body.eventstart,req.body.eventend,false], (err, result) => {
               client.end();
                if(err) {
                  console.log(err);
                  res.status(400).send(err);
                } else {
                    console.log(result.rows[0]);
                  res.send(result.rows[0]);
                }
              });
};