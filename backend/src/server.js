require('dotenv').config();
const app = require('./app');
const { getConnection } = require('./config/database');

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await getConnection();
    console.log('Banco conectado com sucesso.');
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}.`));
  } catch (error) {
    console.error('Erro ao iniciar servidor:', error.message);
  }
}

startServer();
