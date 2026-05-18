const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const equipmentRoutes = require('./routes/equipmentRoutes');
const userRoutes = require('./routes/userRoutes');
const agencyRoutes = require('./routes/agencyRoutes');
const loteRoutes = require('./routes/loteRoutes');
const destinacaoRoutes = require('./routes/destinacaoRoutes');
const reportRoutes = require('./routes/reportRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.get('/health', (req, res) => {
  res.json({ message: 'API EcoTrack Wert online.' });
});

app.use('/auth', authRoutes);
app.use('/equipamentos', equipmentRoutes);
app.use('/usuarios', userRoutes);
app.use('/agencias', agencyRoutes);
app.use('/lotes', loteRoutes);
app.use('/destinacoes', destinacaoRoutes);
app.use('/relatorios', reportRoutes);

module.exports = app;
