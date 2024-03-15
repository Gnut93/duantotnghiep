const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({ 
    cloud_name: 'du3fycrqb', 
    api_key: '426224412945536', 
    api_secret: 'K7En6U0ehB7exs1P08h2Waha-MM' 
  });

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ['jpg', 'png'],
  params: {
    folder: 'DATN'
  }
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;
