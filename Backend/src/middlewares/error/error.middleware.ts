import { Request, Response, NextFunction } from 'express';

/**
 * Middleware para tratamento de erros
 */
export const errorMiddleware = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error('❌ Erro:', error);

  res.status(500).json({
    error: 'Erro interno do servidor',
    message: error.message,
  });
};
