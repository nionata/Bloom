/* Dependencies */
const { Client } = require('pg');
const bcrypt = require('bcryptjs');
const uri = require('../config/config.js');

exports.getAll = async function(req, res, next) {
    // conncects to postres server
    const client = new Client({connectionString: uri.db.uri,ssl: true,});
    await client.connect();

    var query = "SELECT * FROM announcements";
    const approved = req.query.approved;

    if(approved === "true" || approved === "false") {
      query += " where approved=" + approved;
    }

    client.query(query, (err, result) => {
      client.end();
      if(err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        res.send(result.rows)
      }
    });
};

exports.getById = async function(req, res, next) {
    // conncects to postres server
    const client = new Client({connectionString: uri.db.uri,ssl: true,});
    await client.connect();

    client.query("select * from announcements inner join users on announcements.user_id=users.id where announcements.id=$1", [req.params.id], (err, result) => {
      client.end();
      if(err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        if(result.rowCount !== 0) {
          res.send(result.rows[0]);
        } else {
          res.send("Invalid announcement id");
        }
      }
    });
};

exports.delete = async function(req, res, next) {
    // conncects to postres server
    const client = new Client({connectionString: uri.db.uri,ssl: true,});
    await client.connect();

    client.query("DELETE FROM announcements where id = $1", [req.params.id], (err, result) => {
      client.end();
      if(err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        if(result.rowCount === 1) {
          res.sendStatus(200);
        } else {
          res.sendStatus(404);
        }
      }
    });
};

exports.like = async function(req, res, next) {
    // conncects to postres server
    const client = new Client({connectionString: uri.db.uri, ssl: true,});
    await client.connect();

    client.query('UPDATE announcements set likes=likes+1 where id=$1 RETURNING likes', [req.params.id], (err, result) => {
      client.end();
      if(err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        if(result.rowCount !== 0) {
          res.send(result.rows[0]);
        } else {
          res.send("Invalid announcement id");
        }
      }
    });
};

exports.review = async function(req, res, next) {
    // conncects to postres server
    const client = new Client({connectionString: uri.db.uri, ssl: true,});
    await client.connect();

    const { review } = req.body;

    client.query('UPDATE announcements set approved=$1, admin_id=$2 where id=$3 RETURNING approved', [review, req.session.user_id, req.params.id], (err, result) => {
      client.end();
      if(err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        if(result.rowCount !== 0) {
          res.send(result.rows[0]);
        } else {
          res.send("Invalid announcement id");
        }
      }
    });
};

exports.create = async function(req, res, next) {
    // conncects to postres server
    const client = new Client({connectionString: uri.db.uri, ssl: true,});
    await client.connect();

    const { title, content } = req.body;

    client.query('INSERT INTO announcements(user_id, title, content) values($1, $2, $3) RETURNING *', [req.session.user_id, title, content], (err, result) => {
      client.end();
      if(err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        res.send(result.rows[0])
      }
    });
};
