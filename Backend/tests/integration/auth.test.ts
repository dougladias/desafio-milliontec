import request from 'supertest';
import app from '../../src/app';

// Testes de integração para a API de Auth
describe('Auth API Integration Tests', () => {
  describe('POST /api/auth/login', () => {
    it('deve fazer login com credenciais válidas', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'admin',
          password: 'admin',
        })
        .expect(200);

      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user');
      expect(response.body.user.username).toBe('admin');
      expect(typeof response.body.token).toBe('string');
    });

    // Testes para credenciais inválidas e campos faltando
    it('deve retornar 401 com credenciais inválidas', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'admin',
          password: 'wrong',
        })
        .expect(401);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Credenciais inválidas');
    });

    // Testes para campos faltando username
    it('deve retornar 400 sem username', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          password: 'admin',
        })
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Erro de validação');
    });

    // Testes para campos faltando password
    it('deve retornar 400 sem password', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'admin',
        })
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });

    // Testes para body vazio
    it('deve retornar 400 sem body', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({})
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });

    // Testes para Content-Type application/json
    it('deve aceitar Content-Type application/json', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .set('Content-Type', 'application/json')
        .send({
          username: 'admin',
          password: 'admin',
        })
        .expect(200);

      expect(response.body).toHaveProperty('token');
    });
  });
});
