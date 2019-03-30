/* Dependencies */
const { Client } = require('pg');
const bcrypt = require('bcryptjs');
const uri = require('../config/config.js');
const googleurl = require('../config/google-util');
const express = require('../config/express.js');

exports.getAll = async function(req, res, next) {
    // conncects to postres server
    const client = new Client({connectionString: uri.db.uri,ssl: true,});
    await client.connect();

    client.query("SELECT * FROM users", (err, result) => {
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

    client.query("SELECT * FROM users where id=$1", [req.params.id], (err, result) => {
      client.end();
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

exports.getCurrent = async function(req, res, next) {
  // conncects to postres server
  const client = new Client({connectionString: uri.db.uri,ssl: true,});
  await client.connect();

  client.query("SELECT * FROM users where id=$1", [req.session.user_id], (err, result) => {
    client.end();
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      if(result.rowCount !== 0) {
        res.send(result.rows[0]);
      } else {
        res.send("No current user");
      }
    }
  });
}

exports.create = async function(req, res, next) {
    // conncects to postres server
    const client = new Client({connectionString: uri.db.uri, ssl: true,});
    await client.connect();

    client.query('select * from users where username=$1 or email=$2',[req.body.username, req.body.email], (err, result) => {
      if(err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        // check if username already exist
        if(result.rowCount === 0) {
          bcrypt.hash(req.body.password, 10, async function(err, hash) {
              client.query('INSERT INTO users(username, password,admin,email) values($1, $2, $3, $4) RETURNING *', [req.body.username, hash, false, req.body.email], (err, result) => {
                client.end();
                if(err) {
                  console.log(err);
                  res.status(400).send(err);
                } else {
                  res.send(result.rows[0])
                }
              });
          });
        } else {
          client.end();
          if(result.rows[0].username === req.body.username) {
            res.send("That username is taken");
          } else {
            res.send("That email is already being used");
          }
        }
      }
    });
};

exports.getBio = async function(req, res, next) {
  //In progress
  res.send("In progress");
};

exports.setBio = async function(req, res, next) {
  //In progress
  res.send("In progress");
};

exports.updateBio = async function(req, res, next) {
  //In progress
  res.send("In progress");
};

exports.creategoogleuser = async function(req, res, next) {
    var googleuser = await googleurl.GetGoogleUser(req.query.code);
    var useremail = googleuser.email;
    var username = googleuser.id;

    // conncects to postres server
    const client = new Client({connectionString: uri.db.uri,ssl: true,});
    await client.connect();
    // check if username already exist
    var result = await client.query('select * from users where email=$1',[useremail]);

    // if it does not exist add the user
    if(result.rows.length == 0) {
      req.session.user = username;
      req.session.user_id = id;
      res.redirect('/');
      await client.query('INSERT INTO users(username, password,admin,email) values($1, $2 ,$3,$4)',[username.substr(0,16), '',false,useremail]);
      await client.end();
      next();
    } else {
      console.log("pas " + result.rows[0].password);
      if(result.rows[0].password == '') {
        req.session.user = username;
        next();
      } else {
        next();
      }
    }
};

exports.login = async function(req, res, next) {
    // conncects to postres server
    const client = new Client({connectionString: uri.db.uri,ssl: true,});
    await client.connect();

    // check if select row with entered user name
    client.query("SELECT * FROM users where username = $1",[req.body.username], (err, result) => {
      client.end();
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
              req.session.user_id = result.rows[0].id;
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
