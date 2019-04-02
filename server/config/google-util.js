
const google = require('googleapis');
config = require('./config');

// create an oAuth client to authorize the API call
function getAuthenticatedClient() {
  if(process.env.REDIRECT_URL == null) {
    return new google.google.auth.OAuth2 (
      config.googleConfig.clientId,
      config.googleConfig.clientSecret,
      config.googleConfig.redirect
    );
  } else {
    return new google.google.auth.OAuth2 (
      config.googleConfig.clientId,
      config.googleConfig.clientSecret,
      process.env.REDIRECT_URL
    );
  }
}

// generates a url for google login

function generateAuthUrl(auth) {
  return auth.generateAuthUrl({
    access_type: 'offline',
    scope: 'https://www.googleapis.com/auth/userinfo.email'
  });
}


 //create google url for login

exports.CreateGoogleURL = function() {
  const auth = getAuthenticatedClient(); // this is from previous step
  const url = generateAuthUrl(auth);
  return url;
}

// gets email and id of google user from callback code
exports.GetGoogleUser = async function (code) {
      // add the tokens to the google api so we have access to the account
    const authization = getAuthenticatedClient();
    const data = await authization.getToken(code);
    
    const tokens = data.tokens;
    authization.setCredentials(tokens);
    
    const url = 'https://openidconnect.googleapis.com/v1/userinfo';
    const res = await authization.request({url});
    
    return {
    id: res.data.sub,
    email: res.data.email,
  };
  
}
