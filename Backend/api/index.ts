import 'reflect-metadata';
import app from '../src/app';
import { initializeDatabase } from '../src/database/data-source';

// Inicializa o banco de dados uma vez
let dbInitialized = false;

const handler = async (req: any, res: any) => {
  // Configurar CORS manualmente para Vercel
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Inicializa o banco apenas na primeira requisição
  if (!dbInitialized) {
    try {
      await initializeDatabase();
      dbInitialized = true;
    } catch (error) {
      console.error('Erro ao conectar com o banco:', error);
      return res.status(500).json({ error: 'Database connection failed' });
    }
  }

  // Deixa o Express lidar com a requisição
  return app(req, res);
};

export default handler;
