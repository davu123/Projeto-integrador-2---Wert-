const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { rateLimit } = require('express-rate-limit');
const { getConnection } = require('./config/database');

const authRoutes = require('./routes/authRoutes');
const agencyRoutes = require('./routes/agencyRoutes');
const userRoutes = require('./routes/userRoutes');
const loteRoutes = require('./routes/loteRoutes');
const destinacaoRoutes = require('./routes/destinacaoRoutes');
const equipmentRoutes = require('./routes/equipmentRoutes');
const reportRoutes = require('./routes/reportRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const rotaRoutes = require('./routes/rotaRoutes');
const pontoEntregaRoutes = require('./routes/pontoEntregaRoutes');

// TRUST_PROXY: número de proxies na frente da API (1 atrás do Caddy). Vazio ou false: nenhum.
function lerTrustProxy(valor) {
  if (!valor || valor === 'false') return false;
  if (/^\d+$/.test(valor) && Number.isSafeInteger(Number(valor))) return Number(valor);
  throw new Error('TRUST_PROXY deve ser um número inteiro não negativo ou false.');
}

// CORS_ORIGIN: lista separada por vírgula, por exemplo http://localhost:5174,https://ecotrack.exemplo.com.br
const origensPermitidas = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map((origem) => origem.trim())
  .filter(Boolean);

const tentativasLogin = Number(process.env.LOGIN_RATE_LIMIT || 10);
if (!Number.isSafeInteger(tentativasLogin) || tentativasLogin < 1) {
  throw new Error('LOGIN_RATE_LIMIT deve ser um número inteiro positivo.');
}

const limiteLogin = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: tentativasLogin,
  skipSuccessfulRequests: true,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { message: 'Muitas tentativas de login. Tente de novo em 15 minutos.' },
});

const app = express();

app.set('trust proxy', lerTrustProxy(process.env.TRUST_PROXY));
app.use(helmet());
app.use(cors({ origin: origensPermitidas }));
app.use(express.json());

app.get('/health', async (req, res) => {
  try {
    const pool = await getConnection();
    await pool.request().query('SELECT 1 AS ok');
    return res.json({ message: 'API EcoTrack Wert online.', banco: 'ok' });
  } catch (error) {
    console.error('[health] banco indisponível:', error.message);
    return res.status(503).json({ message: 'Banco de dados indisponível.' });
  }
});

app.post('/auth/login', limiteLogin);
app.use('/auth', authRoutes);
app.use('/agencias', agencyRoutes);
app.use('/usuarios', userRoutes);
app.use('/lotes', loteRoutes);
app.use('/destinacoes', destinacaoRoutes);
app.use('/relatorios', reportRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/equipamentos', equipmentRoutes);
app.use('/rotas', rotaRoutes);
app.use('/pontos-entrega', pontoEntregaRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Rota não encontrada.' });
});

// Erro que escapou das rotas, inclusive JSON malformado no corpo. A resposta não leva detalhe interno.
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);
  const status = Number(error.status || error.statusCode);
  if (Number.isInteger(status) && status >= 400 && status < 500) {
    return res.status(status).json({ message: 'Requisição inválida.' });
  }

  console.error('[api] erro não tratado:', error);
  return res.status(500).json({ message: 'Erro interno do servidor.' });
});

module.exports = app;
