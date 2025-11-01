import dotenv from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Exporta as configurações do ambiente
export const config = {  
  // Configurações do servidor
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',

  // Configurações do banco de dados
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'clientes_db',
  },

  // Configurações de autenticação
  jwt: {
    secret: process.env.JWT_SECRET || 'seu_secret_super_secreto',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  },

  // Credenciais fixas do admin
  admin: {
    username: process.env.ADMIN_USERNAME || 'admin',
    password: process.env.ADMIN_PASSWORD || 'admin',
  },
};
