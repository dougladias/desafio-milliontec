import { generateToken, verifyToken } from '../../../src/utils/jwt.util';

// Testes unitários para o jwt
describe('JWT Utils', () => {
  describe('generateToken', () => {
    it('deve gerar um token JWT válido', () => {
      const token = generateToken({ username: 'admin' });

      expect(typeof token).toBe('string');
      expect(token.split('.')).toHaveLength(3); 
    });    
  });

  // Testes para o método verifyToken
  describe('verifyToken', () => {
    it('deve verificar e decodificar um token válido', () => {
      const payload = { username: 'admin' };
      const token = generateToken(payload);

      const decoded = verifyToken(token);

      expect(decoded).toHaveProperty('username');
      expect(decoded.username).toBe(payload.username);
    });

    // Testes para tokens inválidos
    it('deve lançar erro para token inválido', () => {
      const invalidToken = 'invalid.token.here';

      expect(() => verifyToken(invalidToken)).toThrow('Token inválido ou expirado');
    });

    // Testes para tokens expirados
    it('deve lançar erro para token vazio', () => {
      expect(() => verifyToken('')).toThrow('Token inválido ou expirado');
    });

    // Testes para tokens malformados
    it('deve lançar erro para token malformado', () => {
      const malformedToken = 'not-a-valid-jwt';

      expect(() => verifyToken(malformedToken)).toThrow('Token inválido ou expirado');
    });
  });

  // Testes de integração para geração e verificação de token
  describe('Integração generateToken e verifyToken', () => {
    it('deve gerar e verificar token corretamente', () => {
      const payload = { username: 'testuser' };
      const token = generateToken(payload);
      const decoded = verifyToken(token);

      expect(decoded.username).toBe(payload.username);
    });

    // Testes para preservar dados do payload
    it('deve preservar dados do payload após ciclo completo', () => {
      const payload = { username: 'admin' };
      const token = generateToken(payload);
      const decoded = verifyToken(token);

      expect(decoded).toMatchObject(payload);
    });
  });
});
