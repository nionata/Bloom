/* Dependencies */
const { Client } = require('pg');
const bcrypt = require('bcryptjs');
const uri = require('../config/config.js');

exports.create = async function(req, res, next) {
    // conncects to postres server
    const client = new Client({connectionString: uri.db.uri, ssl: true,});
    await client.connect();

    // check if username already exist
    client.query('select exists(select 1 from users where username=$1)',[req.body.username], (err, result) => {
      if(err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        if(!result.rows[0].exists) {
          bcrypt.hash(req.body.password, 10, async function(err, hash) {
              client.query('INSERT INTO users(username, password,admin,email) values($1, $2, $3, $4)', [req.body.username, hash, false, req.body.email], (err, createResult) => {
                if(err) {
                  console.log(err);
                  res.status(400).send(err);
                } else {
                  res.json({
                    "message": "User created successfully"
                  });
                }
              });
          });
        } else {
          res.json({
            "message": "That username is taken"
          });
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
          res.json({
            "message": "That username does not exist"
          })
        } else {
          bcrypt.compare(req.body.password, result.rows[0].password, (err, response) => {
            if(response) {
              req.session.user = req.body.username;
              res.json({
                "message": "User signed in successfully"
              })
            } else {
              res.json({
                "message": "Incorrect password"
              })
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


    client.query("DELETE FROM users where username = $1", [req.body.username], (err, result) => {
      if(err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        res.json({
          "message": "User deleted successfully"
        })
      }
    });
};
