const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateAccessToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '15m' });

const generateRefreshToken = (user) =>
  jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    res.json({ accessToken, refreshToken, user: { id: user._id, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.refresh = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({ message: 'No refresh token' });
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: 'User not found' });
    const accessToken = generateAccessToken(user);
    res.json({ accessToken });
  } catch (err) {
    res.status(401).json({ message: 'Invalid refresh token' });
  }
};

// Remove/protect this route after creating your first admin
exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'User already exists' });
    const user = await User.create({ email, password });
    res.status(201).json({ id: user._id, email: user.email });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};