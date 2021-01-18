const express = require('express');
const multer = require('multer');
const { storage } = require('../cloudinary/index');
require('dotenv').config();
const userController = require('../controllers/userController.js');
const sessionController = require('../controllers/sessionController');
const applicationRouter = require('../routes/applications');

const userRouter = express.Router();

//for image upload to store in local folder
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'avatarImages');
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });

const upload = multer({ storage: storage }).single('file');

//route to upload avatar image
userRouter.post('/upload', (req, res) => {
  //console.log('uploadReq==>', req);
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.log('multerErr==>', err);
      return res.status(500).json(err);
    } else if (err) {
      console.log('generalerr-->', err);
      return res.status(500).json(err);
    } else {
      console.log('req.file==>', req.file);
      return res.status(200).send(req.file);
    }
  });
});

// Route to create a new user
userRouter.post(
  '/signup',
  userController.createUser,
  sessionController.startSession,
  (req, res) => {
    res.status(200).json({
      id: res.locals.id,
      email: res.locals.email,
      firstname: res.locals.firstname,
      avatar: res.locals.avatar,
    });
    res.status(200).send(req.body, req.file);
  }
);

userRouter.post(
  '/signin',
  userController.verifyUser,
  sessionController.startSession,
  (req, res) => {
    res.status(200).json({
      id: res.locals.id,
      email: res.locals.email,
      firstname: res.locals.firstname,
      avatar: res.locals.avatar,
    });
  }
);

//log out by using sending clearCookie
userRouter.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.sendStatus(200);
});

userRouter.use('/:user_id/application', applicationRouter);

module.exports = userRouter;
