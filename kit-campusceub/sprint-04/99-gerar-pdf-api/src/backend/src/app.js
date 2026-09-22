const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const agencyRoutes = require('./routes/agencyRoutes');
const userRoutes = require('./routes/userRoutes');
const loteRoutes = require('./routes/loteRoutes');
const equipmentRoutes = require('./routes/equipmentRoutes');
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
app.use('/agencias', agencyRoutes);
app.use('/usuarios', userRoutes);
app.use('/lotes', loteRoutes);
app.use('/equipamentos', equipmentRoutes);
app.use('/destinacoes', destinacaoRoutes);
app.use('/relatorios', reportRoutes);

module.exports = app;
