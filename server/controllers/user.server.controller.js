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


exports.logout = async function(req, res, next) {
    req.session.user = null;
    req.session.user_id = null;
    res.redirect('/');
}

exports.create = async function(req, res, next) {
    // conncects to postres server
    const client = new Client({connectionString: uri.db.uri, ssl: true,});
    await client.connect();
    var datetime = new Date();
    if(req.body.username.length > 16)
    {
        res.send("Username can't be longer than 16 characters");
        return;
    }else if(req.body.password.length < 6)
    {
        res.send("Password must be longer than 6 character");
        return;
    }


    client.query('select * from users where username=$1 or email=$2',[req.body.username, req.body.email], (err, result) => {
      if(err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        // check if username already exist
        if(result.rowCount === 0) {
          bcrypt.hash(req.body.password, 10, async function(err, hash) {
              client.query('INSERT INTO users(username, password,admin,email,date_created,last_login) values($1, $2, $3, $4, $5,$6)    RETURNING *', [req.body.username, hash, false, req.body.email,datetime,datetime], (err, result) => {
                client.end();
                if(err) {
                  console.log(err);
                  res.status(400).send(err);
                } else {
                  req.session.user = req.body.username;
                  req.session.user_id = result.rows[0].id;
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
  // conncects to postres server
  const client = new Client({connectionString: uri.db.uri,ssl: true,});
  await client.connect();

  const id = req.query.id || req.session.user_id;

  client.query("SELECT * FROM user_bios where user_id=$1", [id], (err, result) => {
    client.end();
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      if(result.rowCount !== 0) {
        res.send(result.rows[0]);
      } else {
        res.send("Bio is empty");
      }
    }
  });
};

exports.setBio = async function(req, res, next) {
  // conncects to postres server
  const client = new Client({connectionString: uri.db.uri, ssl: true,});
  await client.connect();

  const { firstName, lastName, affiliation, bio } = req.body;

  client.query('INSERT INTO user_bios(first_name, last_name, affiliation, bio, user_id) values($1, $2, $3, $4, $5) RETURNING *', [firstName, lastName, affiliation, bio, req.session.user_id], (err, result) => {
    client.end();
    if(err) {
      if(err.code === "23505") {
        res.status(400).send("This user already has a bio");
      } else {
        console.log(err);
        res.status(400).send(err);
      }
    } else {
      res.send(result.rows[0]);
    }
  });
};

exports.updateBio = async function(req, res, next) {
  // conncects to postres server
  const client = new Client({connectionString: uri.db.uri, ssl: true,});
  await client.connect();

  const { firstName, lastName, affiliation, bio } = req.body;

  client.query('UPDATE user_bios SET first_name=$1, last_name=$2, affiliation=$3, bio=$4 WHERE user_id=$5 RETURNING *', [firstName, lastName, affiliation, bio, req.session.user_id], (err, result) => {
    client.end();
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.send(result.rows[0]);
    }
  });
};

exports.creategoogleuser = async function(req, res, next) {
    var googleuser = await googleurl.GetGoogleUser(req.query.code);
    var useremail = googleuser.email;
    var username = useremail;
    username = username.replace('@gmail.com','');
    var datetime = new Date();
    // conncects to postres server
    const client = new Client({connectionString: uri.db.uri,ssl: true,});
    await client.connect();
    // check if username already exist
    var result = await client.query('select * from users where email=$1',[useremail]);

    // if it does not exist add the user
    if(result.rows.length == 0) {
      req.session.user = username;
       result =await client.query('INSERT INTO users(username, password,admin,email,date_created,last_login) values($1, $2 ,$3,$4,$5,$6) RETURNING *',[username.substr(0,16), '',false,useremail,datetime,datetime]);
      req.session.user_id = result.rows[0].id;
     
      await client.end();
        res.redirect('/bio');
      next();
    } else {
      if(result.rows[0].password == '') {
        await client.query("UPDATE users set last_login = $1 where email =$2",[datetime,useremail]);
        await client.end();
        req.session.user_id = result.rows[0].id;
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
    var datetime = new Date();


    // check if select row with entered user name
     client.query("SELECT * FROM users where username = $1",[req.body.username], (err, result)  => {
      if(err) {
        client.end();
        console.log(err);
        res.status(400).send(err);
      } else {
        if(result.rows.length === 0) {
          client.end();
          res.send("That username does not exist");
        } else {
          bcrypt.compare(req.body.password, result.rows[0].password, (err, response) => {
            if(response) {
                client.query("UPDATE users set last_login = $1 where username =$2",[datetime,req.body.username], (err, results)  => {
                     client.end();
                     req.session.user = req.body.username;
                     req.session.user_id = result.rows[0].id;
                     res.send("User signed in successfully");
                })
             
            } else {
              client.end();
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
