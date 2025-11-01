import request from 'supertest';
import app from '../../src/app';

// Testes de integração para a API de Health Check
describe('Health Check API', () => {
  describe('GET /api/health', () => {
    it('deve retornar status OK', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);

      expect(response.body).toHaveProperty('status');
      expect(response.body).toHaveProperty('message');
      expect(response.body.status).toBe('OK');
      expect(response.body.message).toBe('API is running');
    });

    // Teste para garantir que o Content-Type é application/json
    it('deve retornar Content-Type application/json', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);

      expect(response.headers['content-type']).toMatch(/application\/json/);
    });
  });
});
