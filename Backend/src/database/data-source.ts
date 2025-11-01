import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { join } from 'path';
import { config } from '../config/env';
import { Client } from '../entities/Client';

// Configuração do DataSource do TypeORM
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.database,
  
  // Em produção, usamos migrations para maior segurança
  synchronize: config.nodeEnv === 'development',

  logging: config.nodeEnv === 'development',

  entities: [Client],

  // Migrations: arquivos compilados em produção, TypeScript em dev
  migrations:
    config.nodeEnv === 'production'
      ? [join(__dirname, 'migrations/**/*.js')]
      : [join(__dirname, 'migrations/**/*.ts')],

  // Executa migrations automaticamente ao iniciar
  migrationsRun: config.nodeEnv === 'production',
});


// Função para inicializar a conexão
export const initializeDatabase = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    console.log('Banco de dados conectado com sucesso!');

    // Em desenvolvimento, mostra se está usando synchronize ou migrations
    if (config.nodeEnv === 'development') {
      console.log('Modo: DEVELOPMENT (synchronize: true)');
    } else {
      console.log('Modo: PRODUCTION (usando migrations)');
    }
  } catch (error) {
    console.error('Erro ao conectar com o banco de dados:', error);
    process.exit(1);
  }
};
