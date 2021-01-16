const jwt = require('jsonwebtoken');
require('dotenv').config();
const db = require('../models/model');

const authController = {};

const maxAge = 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

authController.createAuthToken = (req, res, next) => {
  const authID = req.user.id;
  // const avatar = req;
  // console.log('avatar==>', avatar);

  console.log('authID===>', req.user.id);

  try {
    const token = createToken(authID);
    console.log('oauthToken==>', token);
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });

    return next();
  } catch (err) {
    return next({
      log: 'sessionController.startSession: ERROR: Unable to create auth token',
      message: {
        err: err.message,
      },
    });
  }
};

authController.verifyAuthToken = async (req, res, next) => {
  const token = req.cookies.token;
  console.log('authtoken===>', token);

  //check if the token exists
  //if doesn't exist, redirect to login in the frontend
  try {
    if (!token) {
      throw new Error('session expires, please log in again');
    }

    //if token exists, verify the token and send back id and email for frontend auth
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    //console.log('decodedFortuneToken--->', decodedToken);

    const userID = decodedToken.id;
    //console.log('decodedToken.id==>', decodedToken.id);
    const queryText = `SELECT * from applicants WHERE id = $1`;

    db.query(queryText, [userID], (err, data) => {
      if (err) {
        //console.log('dbERR===>', err);
        return next(err);
      }
      console.log('userdata===>', data.rows[0]);

      res.locals.email = data.rows[0].email;
      res.locals.id = userID;
      res.locals.firstname = data.rows[0].first_name;
      res.locals.avatar = data.rows[0].avatar;
      console.log('verifyTokenAvatar==>', res.locals.avatar);
      return next();
    });
  } catch (err) {
    //redirect to signin page in the frontend
    return next({
      log: `authController.verifyToken: Unable to verify auth token ERROR: ${err}`,
      status: 401,
      message: {
        err: err.message,
      },
    });
  }
};

module.exports = authController;
