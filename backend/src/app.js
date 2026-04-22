const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const equipmentRoutes = require('./routes/equipmentRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ message: 'API EcoTrack Wert online.' });
});

app.use('/auth', authRoutes);
app.use('/equipamentos', equipmentRoutes);

module.exports = app;