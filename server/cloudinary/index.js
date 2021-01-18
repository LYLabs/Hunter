const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

//cloudinary config:
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.Cloudinary_APIKey,
  api_secret: process.env.Cloudinary_SECRET,
});

//image upload to store in cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'avatar',
    allowedFormats: ['jpeg', 'png', 'jpg'],
  },
});

module.exports = {
  cloudinary,
  storage,
};
