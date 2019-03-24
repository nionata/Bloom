/* Dependencies */
const { Client } = require('pg');
const bcrypt = require('bcryptjs');
const uri = require('../config/config.js');
googleurl =require('../config/google-util');
express = require('../config/express.js');


exports.create = async function(req, res, next) {
    
    
    // conncects to postres server
    const client = new Client({connectionString: uri.db.uri,ssl: true,});
    await client.connect();
    // check if username already exist
    var result = await client.query('select exists(select 1 from users where username=$1)',[req.body.username]);

    // if it does not exist add the user
    if(result.rows[0].exists==false) {
      bcrypt.hash(req.body.password, 10, async function(err, hash) {
          res.locals.success = true;
          await client.query('INSERT INTO users(username, password,admin,email) values($1, $2 ,$3,$4)',[req.body.username, hash,false,req.body.email]);
          await client.end();
          next();
      });
    } else {
        // else pass false to the next function
        res.locals.success = false;
        next();
    }
    
};


exports.creategoogleuser = async function(req, res, next) {
    var googleuser = await googleurl.getGoogleAccountFromCode(req.query.code);
    var useremail = googleuser.email;
    var username = googleuser.id;
    
    // conncects to postres server
    const client = new Client({connectionString: uri.db.uri,ssl: true,});
    await client.connect();
    // check if username already exist
    var result = await client.query('select exists(select 1 from users where email=$1)',[useremail]);

    // if it does not exist add the user
    if(result.rows[0].exists==false) {
          req.session.user =username;
          res.redirect('/dashboard');
          await client.query('INSERT INTO users(username, password,admin,email) values($1, $2 ,$3,$4)',[username.substr(0,16), '',false,useremail]);
          await client.end();
          next();
    } else {
          req.session.user = username;
          next();
    }
    
};

exports.login = async function(req, res, next) {
   
    // conncects to postres server
    const client = new Client({connectionString: uri.db.uri,ssl: true,});
    await client.connect();

    // check if select row with entered user name
    var result = await client.query("SELECT * FROM users where username = $1",[req.body.username]);
    result.rows.forEach(row=>{
        // check if passwords match
        bcrypt.compare(req.body.password, row.password, function(err, response) {
          if(response) {
            res.locals.log = true;
            next();
          } else {
            res.locals.log = false;
            next();
          }
        });
    });

    // if the username was not founds
    if(result.rows.length == 0) {
        res.locals.log = false;
        next();
    }
};
