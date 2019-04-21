/* Dependencies */
const { Client } = require('pg');
const bcrypt = require('bcryptjs');
const uri = require('../config/config.js');
express = require('../config/express.js');


exports.getUserLogins = async function(req, res) {
    // conncects to postres server
    const client = new Client({connectionString: uri.db.uri,ssl: true,});
    await client.connect();
    startDate = "2019-04-15";
    endDate = "2019-04-25";
    var events = await client.query('select last_login from users where last_login between $1 AND $2 ORDER BY last_login',[startDate,endDate]);
    var numberOfLogins = 0;
    var last = events.rows[0].last_login.toDateString();
    var returnlist = [];
    for(var x = 0; x< events.rows.length; x++)
    {
        current = events.rows[x].last_login.toDateString();
        if(current == last)
        {
            last = current;
            numberOfLogins++;
        }else
        {
            returnlist.push(new Logins(last,numberOfLogins));
            last = current;
            numberOfLogins = 1;
        }
    }
    returnlist.push(new Logins(last,numberOfLogins));
    
    await client.end();
    res.send(returnlist);
};

exports.getUsersCreated = async function(req, res) {
    // conncects to postres server
    const client = new Client({connectionString: uri.db.uri,ssl: true,});
    await client.connect();
    startDate = "2019-04-15";
    endDate = "2019-04-25";
    var events = await client.query('select date_created from users where date_created between $1 AND $2 ORDER BY date_created',[startDate,endDate]);
    var numberOfLogins = 0;
    var last = events.rows[0].date_created.toDateString();
    var returnlist = [];
    for(var x = 0; x< events.rows.length; x++)
    {
        current = events.rows[x].date_created.toDateString();
        if(current == last)
        {
            last = current;
            numberOfLogins++;
        }else
        {
            returnlist.push(new Logins(last,numberOfLogins));
            last = current;
            numberOfLogins = 1;
        }
    }
    returnlist.push(new Logins(last,numberOfLogins));
    
    await client.end();
    res.send(returnlist);
};

exports.getEventsCreated = async function(req, res) {
    // conncects to postres server
    const client = new Client({connectionString: uri.db.uri,ssl: true,});
    await client.connect();
    startDate = "2019-04-15";
    endDate = "2019-04-25";
    var events = await client.query('select date_created from events where date_created between $1 AND $2 ORDER BY date_created',[startDate,endDate]);
    var numberOfLogins = 0;
    var last = events.rows[0].date_created.toDateString();
    var returnlist = [];
    for(var x = 0; x< events.rows.length; x++)
    {
        current = events.rows[x].date_created.toDateString();
        if(current == last)
        {
            last = current;
            numberOfLogins++;
        }else
        {
            returnlist.push(new Logins(last,numberOfLogins));
            last = current;
            numberOfLogins = 1;
        }
    }
    returnlist.push(new Logins(last,numberOfLogins));
    
    await client.end();
    res.send(returnlist);
};

exports.getannouncementsCreated = async function(req, res) {
    // conncects to postres server
    const client = new Client({connectionString: uri.db.uri,ssl: true,});
    await client.connect();
    startDate = "2019-04-15";
    endDate = "2019-04-25";
    var events = await client.query('select date_created from announcements where date_created between $1 AND $2 ORDER BY date_created',[startDate,endDate]);
    var numberOfLogins = 0;
    var last = events.rows[0].date_created.toDateString();
    var returnlist = [];
    for(var x = 0; x< events.rows.length; x++)
    {
        current = events.rows[x].date_created.toDateString();
        if(current == last)
        {
            last = current;
            numberOfLogins++;
        }else
        {
            returnlist.push(new Logins(last,numberOfLogins));
            last = current;
            numberOfLogins = 1;
        }
    }
    returnlist.push(new Logins(last,numberOfLogins));
    
    await client.end();
    res.send(returnlist);
};

function getdates(column)
{
    
}

class Logins {
  constructor(date, number) {
    this.date = date;
    this.number = number;
  }
}