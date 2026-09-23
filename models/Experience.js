const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: String,
  startDate: Date,
  endDate: Date,
  description: String,
  current: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Experience', experienceSchema);