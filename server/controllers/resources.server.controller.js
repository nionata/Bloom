/* Dependencies */
const { Client } = require('pg');
const uri = require('../config/config.js');

exports.getAll = async function(req, res, next) {
    // conncects to postres server
    const client = new Client({connectionString: uri.db.uri,ssl: true,});
    await client.connect();

    client.query("SELECT * FROM resources", (err, result) => {
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

    client.query("SELECT * FROM resources where id=$1", [req.params.id], (err, result) => {
      client.end();
      if(err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        if(result.rowCount !== 0) {
          res.send(result.rows[0]);
        } else {
          res.send("Invalid resource id");
        }
      }
    });
};

exports.delete = async function(req, res, next) {
    // conncects to postres server
    const client = new Client({connectionString: uri.db.uri,ssl: true,});
    await client.connect();

    client.query("SELECT * FROM users where id=$1", [req.session.user_id], (err, result) => {
      if(err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        if(result.rows[0].admin === true) {
          client.query("DELETE FROM resources where id=$1", [req.params.id], (err, result) => {
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
        } else {
          res.send("The current user is not an admin");
        }
      }
    });
};

exports.create = async function(req, res, next) {
    // conncects to postres server
    const client = new Client({connectionString: uri.db.uri, ssl: true,});
    await client.connect();

    const { title, category, link, description } = req.body;

    client.query("SELECT * FROM users where id=$1", [req.session.user_id], (err, result) => {
      if(err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        if(result.rows[0].admin === true) {
          client.query('INSERT INTO resources(admin_id, title, category, link, description) values($1, $2, $3, $4, $5) RETURNING *', [req.session.user_id, title, category, link, description], (err, result) => {
            client.end();
            if(err) {
              console.log(err);
              res.status(400).send(err);
            } else {
              res.send(result.rows[0])
            }
          });
        } else {
          res.send("The current user is not an admin");
        }
      }
    });
};
