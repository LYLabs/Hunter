const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('../models/model.js');
//const keys = require('./keys');

passport.serializeUser((user, done) => {
  console.log('in serialize');
  done(null, user.id);
}); //generate a unique identifier and add to cookie in the browser

passport.deserializeUser(async (id, done) => {
  console.log('deserialize ID===>', id);
  const query = `SELECT * FROM applicants WHERE id = $1`;
  const value = [id];
  try {
    const data = await db.query(query, value);
    const user = data.rows[0];
    console.log('user found===>', user);
    done(null, user);
  } catch (err) {
    console.log('error finding id===>', err);
  }
}); // after serialize, for any subsequent new request, we will need to deserialize by extracting the cookie using cookieSession in server.js file and deserialize the user id to the user.

passport.use(
  new GoogleStrategy(
    {
      //clientID: keys.google.clientID, //public token, sharable, identify ourselves to google servers.
      //clientSecret: keys.google.clientSecret,
      //not sharable, secret
      clientID: process.env.GOOGLE_CLIENTID,
      clientSecret: process.env.GOOGLE_CLIENTSECRET,
      callbackURL: '/auth/google/redirect',
    },

    //this is a callback func
    function (accessToken, refreshToken, profile, done) {
      console.log('profile==>', profile);
      //maybe better to use id instead of email to search, id is unique, while email not necessarily
      const qText = `SELECT * FROM applicants WHERE email = $1`;
      const email = [profile._json.email];
      console.log('email', email);

      db.query(qText, email, (err, data) => {
        if (data.rows.length === 0) {
          const {
            given_name,
            family_name,
            email,
            sub,
            picture,
          } = profile._json;
          const queryText = `INSERT INTO applicants (first_name, last_name, email, password, avatar) VALUES ($1, $2, $3, $4,$5) RETURNING *`;
          const value = [given_name, family_name, email, sub, picture];
          db.query(queryText, value, (err, data) => {
            if (err) {
              console.log('errCreatingUser==>', err);
            }
            console.log('userCreated===>', data.rows[0]);
            const newUser = data.rows[0];
            done(null, newUser); //first arg is an error obj, indicating something going wrong, in this case, since it successfully created the user, error obj would be null

            //calling done with newly created user to tell passport to resume to auth process
          });
        }
        console.log('userAlreadyExists==>', data.rows[0]);
        const currentUser = data.rows[0];

        done(null, currentUser); //calling done with found user to tell passport to resume to auth process
      });
    }
  )
);
