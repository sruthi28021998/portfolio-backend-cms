const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: String,
  company: String,
  message: String,
  avatar: String
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', testimonialSchema);