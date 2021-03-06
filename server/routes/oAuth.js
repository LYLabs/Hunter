const express = require('express');
const { router } = require('../server');
const authRouter = express.Router({ mergeParams: true });
require('../config/passport-config');
require('../config/passport-config-github');
const passport = require('passport');
const authController = require('../controllers/authController');

//auth with google
authRouter.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

authRouter.get(
  '/google/redirect',
  passport.authenticate('google'),
  authController.createAuthToken,
  (req, res) => {
    res.redirect('/');
  }
);

authRouter.get(`/signin`, authController.verifyAuthToken, (req, res) => {
  res.status(200).json({
    id: res.locals.id,
    email: res.locals.email,
    firstname: res.locals.firstname,
    avatar: res.locals.avatar,
  });
});

//auth with github
authRouter.get(
  '/github',
  passport.authenticate('github', {
    scope: ['user:email'],
  })
);

authRouter.get(
  '/github/redirect',
  passport.authenticate('github'),
  authController.createAuthToken,
  (req, res) => {
    res.redirect('/');
  }
);

module.exports = authRouter;
