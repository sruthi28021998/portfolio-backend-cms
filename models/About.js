const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  title: String,
  bio: String,
  profileImage: String,
  resumeUrl: String,
  socialLinks: {
    github: String,
    linkedin: String,
    twitter: String
  }
}, { timestamps: true });

module.exports = mongoose.model('About', aboutSchema);