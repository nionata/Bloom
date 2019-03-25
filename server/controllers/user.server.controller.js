/* Dependencies */
const { Client } = require('pg');
const bcrypt = require('bcryptjs');
const uri = require('../config/config.js');

exports.getAll = async function(req, res, next) {
    // conncects to postres server
    const client = new Client({connectionString: uri.db.uri,ssl: true,});
    await client.connect();

    client.query("SELECT * FROM users", (err, result) => {
      if(err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        res.send(result.rows)
      }
    });
};

exports.get = async function(req, res, next) {
    // conncects to postres server
    const client = new Client({connectionString: uri.db.uri,ssl: true,});
    await client.connect();

    client.query("SELECT * FROM users where id=$1", [req.params.id], (err, result) => {
      if(err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        if(result.rowCount !== 0) {
          res.send(result.rows[0]);
        } else {
          res.send("Invalid user id");
        }
      }
    });
};

exports.create = async function(req, res, next) {
    // conncects to postres server
    const client = new Client({connectionString: uri.db.uri, ssl: true,});
    await client.connect();

    client.query('select exists(select 1 from users where username=$1)',[req.body.username], (err, result) => {
      if(err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        // check if username already exist
        if(!result.rows[0].exists) {
          bcrypt.hash(req.body.password, 10, async function(err, hash) {
              client.query('INSERT INTO users(username, password,admin,email) values($1, $2, $3, $4) RETURNING *', [req.body.username, hash, false, req.body.email], (err, result) => {
                if(err) {
                  console.log(err);
                  res.status(400).send(err);
                } else {
                  res.send(result.rows[0])
                }
              });
          });
        } else {
          res.send("That username is taken");
        }
      }
    });
};

exports.login = async function(req, res, next) {
    // conncects to postres server
    const client = new Client({connectionString: uri.db.uri,ssl: true,});
    await client.connect();

    // check if select row with entered user name
    client.query("SELECT * FROM users where username = $1",[req.body.username], (err, result) => {
      if(err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        if(result.rows.length === 0) {
          res.send("That username does not exist");
        } else {
          bcrypt.compare(req.body.password, result.rows[0].password, (err, response) => {
            if(response) {
              req.session.user = req.body.username;
              res.send("User signed in successfully");
            } else {
              res.send("Incorrect password");
            }
          });
        }
      }
    });
};

exports.delete = async function(req, res, next) {
    // conncects to postres server
    const client = new Client({connectionString: uri.db.uri,ssl: true,});
    await client.connect();

    client.query("DELETE FROM users where id = $1", [req.params.id], (err, result) => {
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
