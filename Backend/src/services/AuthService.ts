import { config } from '../config/env';
import { generateToken } from '../utils/jwt.util';
import { LoginDTO, AuthResponse } from '../types/interfaces';

export class AuthService {
  // Realiza o login do usuário
  async login(data: LoginDTO): Promise<AuthResponse> {
    const { username, password } = data;

    // Valida credenciais fixas
    if (
      username !== config.admin.username ||
      password !== config.admin.password
    ) {
      throw new Error('Credenciais inválidas');
    }

    // Gera token JWT
    const token = generateToken({ username });

    // Retorna token e informações do usuário
    return {
      token,
      user: {
        username,
      },
    };
  }
}
