require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const contentRoutes = require('./routes/contentRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const connectDB = require('./config/db');

connectDB();

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || '*' }));
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/api', contentRoutes);
app.use('/upload', uploadRoutes);
app.use('/uploads', express.static(uploadsDir));

app.get('/', (req, res) => res.json({ status: 'CMS API running' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));