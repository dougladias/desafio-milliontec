import 'reflect-metadata';
import app from '../src/app';
import { initializeDatabase } from '../src/database/data-source';

// Inicializa o banco de dados uma vez
let dbInitialized = false;

const handler = async (req: any, res: any) => {
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
