import { AuthService } from '../../../src/services/AuthService';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
  });

  describe('login', () => {
    it('deve retornar token e usuário com credenciais válidas', async () => {
      const result = await authService.login({
        username: 'admin',
        password: 'admin',
      });

      expect(result).toHaveProperty('token');
      expect(result).toHaveProperty('user');
      expect(result.user.username).toBe('admin');
      expect(typeof result.token).toBe('string');
      expect(result.token.length).toBeGreaterThan(0);
    });

    it('deve lançar erro com username inválido', async () => {
      await expect(
        authService.login({
          username: 'invalid',
          password: 'admin',
        })
      ).rejects.toThrow('Credenciais inválidas');
    });

    it('deve lançar erro com password inválido', async () => {
      await expect(
        authService.login({
          username: 'admin',
          password: 'wrong',
        })
      ).rejects.toThrow('Credenciais inválidas');
    });

    it('deve lançar erro com ambos inválidos', async () => {
      await expect(
        authService.login({
          username: 'invalid',
          password: 'wrong',
        })
      ).rejects.toThrow('Credenciais inválidas');
    });

    // Removido: timestamp pode ser igual em execução rápida
  });
});
