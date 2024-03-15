const express = require('express');
const router = express.Router();
const uploadCloud = require('../configs/cloudinary.config');

router.post('/cloudinary-upload', uploadCloud.single('file'), (req, res, next) => {
  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }
  console.log(req.file);
  res.json({ secure_url: req.file.path });
});

module.exports = router;
