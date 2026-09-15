const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const agencyRoutes = require('./routes/agencyRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ message: 'API EcoTrack Wert online.' });
});

app.use('/auth', authRoutes);
app.use('/agencias', agencyRoutes);

module.exports = app;
