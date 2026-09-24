const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  filename: String,
  url: String,
  mimetype: String,
  size: Number
}, { timestamps: true });

module.exports = mongoose.model('Media', mediaSchema);