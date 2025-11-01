import { Request } from 'express';

// Extensão da interface Request para incluir informações do usuário autenticado
declare global {
  namespace Express {
    interface Request {
      user?: {
        username: string;
      };
    }
  }
}
