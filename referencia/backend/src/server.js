require('dotenv').config();

console.log('[bootstrap] carregando backend EcoTrack...');

const { getConnection, getDatabaseDiagnostics } = require('./config/database');
const { ensureDatabaseSchema } = require('./config/schema');

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    console.log('[bootstrap] configuracao de banco:', getDatabaseDiagnostics());
    console.log('[bootstrap] carregando aplicacao Express...');
    const app = require('./app');

    console.log('[bootstrap] validando schema do banco...');
    await ensureDatabaseSchema();

    console.log('[bootstrap] testando conexao principal com banco...');
    await getConnection();
    console.log('Banco conectado com sucesso.');

    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}.`));
  } catch (error) {
    console.error('Erro ao iniciar servidor:', error.message);
    console.error(
      '[bootstrap] verifique DB_SERVER, DB_PORT, DB_DATABASE, DB_USER e DB_PASSWORD no .env.'
    );
    process.exit(1);
  }
}

startServer();
