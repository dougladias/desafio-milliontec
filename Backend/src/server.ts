import 'reflect-metadata';
import app from './app';
import { config } from './config/env';
import { initializeDatabase } from './database/data-source';

// Função para iniciar o servidor
const startServer = async () => {
  try {
    // Conecta ao banco de dados
    await initializeDatabase();

    // Inicia o servidor
    const PORT = config.port;
    app.listen(PORT, () => {
      console.log(`=> Servidor rodando na porta ${PORT}`);      
      console.log(`=> Health check: http://{URL}}:${PORT}/api/health`);
      console.log(`=> Documentacao Swagger: http://{URL}:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
    process.exit(1);
  }
};

// Inicia o servidor
startServer();
