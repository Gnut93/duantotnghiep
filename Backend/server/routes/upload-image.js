const express = require('express');
const router = express.Router();
const uploadCloud = require('../configs/cloudinary.config');

// Error handling middleware
function handleError(err, req, res, next) {
  console.error(err);
  res.status(500).json({ error: err.message });
}

router.post('/cloudinary-upload', uploadCloud.single('file'), (req, res, next) => {
  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }
  res.json({ secure_url: req.file.path });
}, handleError);

module.exports = router;
