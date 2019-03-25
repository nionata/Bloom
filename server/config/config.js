//This file holds any configuration variables we may need
//'config.js' is typically ignored by git to protect sensitive information, such as your database's username and password

module.exports = {
  db: {
    uri:  "postgres://iwjewfjobkazdj:ebb30356e4f44872b394e806ec18b67a392dee8fcd8788c25ffa628ebe0a90aa@ec2-174-129-10-235.compute-1.amazonaws.com:5432/d5vh26dfqt2dp8", //place the URI of your database here.
  },
  port: 8080
};

exports.getdatabaseuri = function()
{
    if(process.env.DATABASE_URL == null)
    {
        return uri;
    }else
    {
        return process.env.DATABASE_URL;
    }
}

