require('dotenv').config();

console.log('[bootstrap] carregando backend EcoTrack (app)...');

const { getConnection, getDatabaseDiagnostics } = require('./config/database');
const { ensureDatabaseSchema } = require('./config/schema');

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    console.log('[bootstrap] configuracao de banco:', getDatabaseDiagnostics());
    const app = require('./app');

    await ensureDatabaseSchema();
    await getConnection();
    console.log('Banco conectado com sucesso.');

    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}.`));
  } catch (error) {
    console.error('Erro ao iniciar servidor:', error.message);
    process.exit(1);
  }
}

startServer();
