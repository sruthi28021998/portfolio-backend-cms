const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  level: { type: Number, min: 0, max: 100, default: 50 },
  icon: String
}, { timestamps: true });

module.exports = mongoose.model('Skill', skillSchema);