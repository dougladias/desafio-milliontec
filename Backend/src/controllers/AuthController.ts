import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  // Realiza o login do usuário
  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        res.status(400).json({ error: 'Username e password são obrigatórios' });
        return;
      }

      const result = await this.authService.login({ username, password });

      // Retorna o token JWT e informações do usuário
      res.status(200).json(result);
    } catch (error) {
      if (error instanceof Error && error.message === 'Credenciais inválidas') {
        res.status(401).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Erro ao realizar login' });
      }
    }
  };
}
