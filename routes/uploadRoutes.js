const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Media = require('../models/Media');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp|gif/;
    const ok = allowed.test(path.extname(file.originalname).toLowerCase());
    cb(ok ? null : new Error('Only image files are allowed'), ok);
  }
});

router.post('/image', protect, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    const media = await Media.create({
      filename: req.file.filename,
      url: fileUrl,
      mimetype: req.file.mimetype,
      size: req.file.size
    });
    res.status(201).json(media);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;