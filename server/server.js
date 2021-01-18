const path = require('path');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
require('dotenv').config();

const app = express();
const userRouter = require('./routes/users');
const authRouter = require('./routes/oAuth');
const passport = require('passport');
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieSession({ maxAge: 60 * 60 * 1000, keys: [process.env.keys] }));
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

app.use(cors());

app.options('*', cors());
//Route Handlers
app.use('/auth', authRouter);
app.use('/user', userRouter);

//Default Error Handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log('default err --->', err);

  console.log('errorObj.message===>', errorObj.message);
  console.log('errorObj.status===>', errorObj.status);
  return res.status(errorObj.status).json(errorObj.message);
});

if (process.env.NODE_ENV === 'production') {
  // statically serve everything in the build folder on the route '/build'
  app.use('/build', express.static(path.join(__dirname, '../build')));
  // serve index.html on the route '/'
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
  });
}

// Catch-all to unknown routes (404)
app.use((req, res) => res.sendStatus(404));

//Start Server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
