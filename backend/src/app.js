const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const equipmentRoutes = require('./routes/equipmentRoutes');
const userRoutes = require('./routes/userRoutes');
const agencyRoutes = require('./routes/agencyRoutes');
const loteRoutes = require('./routes/loteRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ message: 'API EcoTrack Wert online.' });
});

app.use('/auth', authRoutes);
app.use('/equipamentos', equipmentRoutes);
app.use('/usuarios', userRoutes);
app.use('/agencias', agencyRoutes);
app.use('/lotes', loteRoutes);

module.exports = app;