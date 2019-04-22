/* Dependencies */
const { Client } = require('pg');
const bcrypt = require('bcryptjs');
const uri = require('../config/config.js');
express = require('../config/express.js');

exports.getAll = async function(req, res) {
    var anaylics = [];
    // conncects to postres server
    const client = new Client({connectionString: uri.db.uri,ssl: true,});
    await client.connect();
    startDate = req.body.eventstart;
    endDate = req.body.eventend;
    
    var d = new Date(startDate);
    var e = new Date(endDate);
    var events = await client.query('select date_created from events where date_created between $1 AND $2 ORDER BY date_created',[startDate,endDate]);
    var logins = await client.query('select last_login from users where last_login between $1 AND $2 ORDER BY last_login',[startDate,endDate]);
    var accounts = await client.query('select date_created from users where date_created between $1 AND $2 ORDER BY date_created',[startDate,endDate]);
    var announcements = await client.query('select date_created from announcements where date_created between $1 AND $2 ORDER BY date_created',[startDate,endDate]); 
    
    var date = [];
    if(events.rows.length > 0){
    var numberOfLogins = 0;
    var last = events.rows[0].date_created.toDateString();
    (allDate = []).length = ((e-d)/86400000)+1;
    allDate.fill(0);
    console.log(allDate);
    for(var x = 0; x< events.rows.length; x++)
    {
        current = events.rows[x].date_created.toDateString();
        if(current == last)
        {
            last = current;
            numberOfLogins++;
        }else
        {
            allDate[Math.round((events.rows[x].date_created-d)/86400000)-2] = numberOfLogins;
            last = current;
            numberOfLogins = 1;
        }
    }
    allDate[Math.round((events.rows[events.rows.length-1].date_created-d)/86400000)-1] = numberOfLogins;
    }
    anaylics.push(allDate);
    
     (allDate = []).length = ((e-d)/86400000)+1;
    allDate.fill(0);
    if(accounts.rows.length > 0){
    var numberOfLogins = 0;
    var last = accounts.rows[0].date_created.toDateString();
    
    for(var x = 0; x< accounts.rows.length; x++)
    {
        current = accounts.rows[x].date_created.toDateString();
        if(current == last)
        {
            last = current;
            numberOfLogins++;
        }else
        {
             allDate[Math.round((events.rows[x].date_created-d)/86400000)-2] = numberOfLogins;
            last = current;
            numberOfLogins = 1;
        }
    }
     allDate[Math.round((events.rows[events.rows.length-1].date_created-d)/86400000)-1] = numberOfLogins;
    }
     anaylics.push(allDate);
    
     (allDate = []).length = ((e-d)/86400000)+1;
    allDate.fill(0);
    if(announcements.rows.length > 0){
    var numberOfLogins = 0;
    var last = announcements.rows[0].date_created.toDateString();
    for(var x = 0; x< announcements.rows.length; x++)
    {
        current = announcements.rows[x].date_created.toDateString();
        if(current == last)
        {
            last = current;
            numberOfLogins++;
        }else
        {
            allDate[Math.round((events.rows[x].date_created-d)/86400000)-2] = numberOfLogins;
            last = current;
            numberOfLogins = 1;
        }
    }
    allDate[Math.round((events.rows[events.rows.length-1].date_created-d)/86400000)-1] = numberOfLogins;
    }
    
    anaylics.push(allDate);
    
    
   (allDate = []).length = ((e-d)/86400000)+1;
    allDate.fill(0);
    if(logins.rows.length > 0){
     var numberOfLogins = 0;
    var last = logins.rows[0].last_login.toDateString();
    for(var x = 0; x< logins.rows.length; x++)
    {
        current = logins.rows[x].last_login.toDateString();
        if(current == last)
        {
            last = current;
            numberOfLogins++;
        }else
        {
           allDate[Math.round((events.rows[x].date_created-d)/86400000)-2] = numberOfLogins;
            last = current;
            numberOfLogins = 1;
        }
    }
      allDate[Math.round((events.rows[events.rows.length-1].date_created-d)/86400000)-1] = numberOfLogins;
    }
    
    anaylics.push(allDate);
    
    
    await client.end();
    res.send(anaylics);
}

class Logins {
  constructor(date, number) {
    this.date = date;
    this.number = number;
  }
}