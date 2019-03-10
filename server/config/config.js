//This file holds any configuration variables we may need
//'config.js' is typically ignored by git to protect sensitive information, such as your database's username and password

module.exports = {
  db: {
    uri:  "postgres://cpynvkvwppcstx:dccee649b249bd7063c255668e006761bc0d3641d2c74831d100de81bfebf6eb@ec2-54-83-55-115.compute-1.amazonaws.com:5432/d6jcl9ghh8sqnu", //place the URI of your database here.
  },
  port: 8080
};
