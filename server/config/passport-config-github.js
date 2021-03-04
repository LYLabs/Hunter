const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const db = require('../models/model.js');
// const keys = require('./keys');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
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
});

passport.use(
  new GitHubStrategy(
    {
      // clientID: keys.github.clientID,
      // clientSecret: keys.github.clientSecret,
      clientID: process.env.GITHUB_CLIENTID,
      clientSecret: process.env.GITHUB_CLIENTSECRET,
      callbackURL: 'http://localhost:3000/auth/github/redirect',
    },

    function (accessToken, refreshToken, profile, done) {
      console.log('githubprofile==>', profile);
      const qText = `SELECT * FROM applicants WHERE email = $1`;
      const email = [profile._json.email];
      console.log('email', email);

      db.query(qText, email, (err, data) => {
        if (data.rows.length === 0) {
          const { login, email, node_id, avatar_url } = profile._json;
          const queryText = `INSERT INTO applicants (first_name, last_name, email, password,avatar) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
          const value = [login, login, email, node_id, avatar_url];
          db.query(queryText, value, (err, data) => {
            if (err) {
              console.log('errCreatingUser==>', err);
            }
            console.log('userCreated===>', data.rows[0]);
            const newUser = data.rows[0];
            done(null, newUser);
          });
        }
        console.log('userAlreadyExists==>', data.rows[0]);
        const currentUser = data.rows[0];

        done(null, currentUser);
      });
    }
  )
);
