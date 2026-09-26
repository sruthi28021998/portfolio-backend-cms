const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { protect } = require('../middleware/auth');
const sendEmail = require('../utils/sendEmail');

router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email and message are required' });
    }
    const saved = await Message.create({ name, email, subject, message });

    sendEmail({
      to: process.env.EMAIL_USER,
      subject: `New contact form message: ${subject || 'No subject'}`,
      text: `From: ${name} (${email})\n\n${message}`
    }).catch((e) => console.error('Email send failed:', e.message));

    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', protect, async (req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 });
  res.json(messages);
});

module.exports = router;