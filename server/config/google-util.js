
const google = require('googleapis');

const googleConfig = {
  clientId: '821630356189-n8s79aq3ha2h7ogmhlfvash9tmuj8jju.apps.googleusercontent.com', // e.g. asdfghjkljhgfdsghjk.apps.googleusercontent.com
  clientSecret: '5UX20QxveljwJKNuruKZf0S9', // e.g. _ASDFA%DFASDFASDFASD#FAD-
  redirect: 'http://localhost:8080/api/users/auth/google-auth' // this must match your google api settings
};

/**
 * Create the google auth object which gives us access to talk to google's apis.
 */
function createConnection() {
  if(process.env.REDIRECT_URL == null) {
    return new google.google.auth.OAuth2 (
      googleConfig.clientId,
      googleConfig.clientSecret,
      googleConfig.redirect
    );
  } else {
    return new google.google.auth.OAuth2 (
      googleConfig.clientId,
      googleConfig.clientSecret,
      process.env.REDIRECT_URL
    );
  }
}

/**
 * This scope tells google what information we want to request.
 */
const defaultScope = [
  'https://www.googleapis.com/auth/plus.me',
  'https://www.googleapis.com/auth/userinfo.email',
];

// generates a url for google login

function getConnectionUrl(auth) {
  return auth.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: defaultScope
  });
}


 //create google url for login

exports.CreateGoogleURL = function() {
  const auth = createConnection(); // this is from previous step
  const url = getConnectionUrl(auth);
  return url;
}

function getGooglePlusApi(auth) {
  return google.google.plus({ version: 'v1', auth });
}

// gets email and id of google user for callback code
exports.GetGoogleUser = async function (code) {


  // add the tokens to the google api so we have access to the account
  const authization = createConnection();
  const data = await authization.getToken(code);
  const tokens = data.tokens;
  authization.setCredentials(tokens);

  // connect to google plus - need this to get the user's email
  const plus = getGooglePlusApi(authization);
  const me = await plus.people.get({ userId: 'me' });

  // get the google id and email
  const userId = me.data.id;
  const userEmail = me.data.emails && me.data.emails.length && me.data.emails[0].value;
  // return user email and ID
  return {
    id: userId,
    email: userEmail,
  };
}
