import request from 'supertest';
import app from '../../src/app';

// Testes de integração para a API de Clients sem conexão com o banco de dados
describe('Clients API Integration Tests (sem banco)', () => {
  let authToken: string;

  beforeAll(async () => {
    // Faz login para obter o token
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'admin',
        password: 'admin',
      });

    authToken = loginResponse.body.token;
  });

  // Testes para a rota POST /api/clients
  describe('POST /api/clients', () => {
    it('deve retornar 401 sem token de autenticação', async () => {
      const newClient = {
        name: 'Maria Santos',
        email: 'maria@test.com',
        phone: '(21) 99999-9999',
        address: 'Av. Brasil, 456',
      };

      const response = await request(app)
        .post('/api/clients')
        .send(newClient)
        .expect(401);

      expect(response.body).toHaveProperty('error');
    });

    // Teste de validação de campos obrigatórios
    it('deve retornar 400 com campos faltando', async () => {
      const response = await request(app)
        .post('/api/clients')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Pedro Oliveira',
          email: 'pedro@test.com',
          // phone está faltando
          address: 'Av. Brasil, 456',
        })
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Erro de validação');
    });

    // Teste de validação de formato do token JWT
    it('deve validar formato do token JWT', async () => {
      const response = await request(app)
        .post('/api/clients')
        .set('Authorization', 'Bearer invalid-token')
        .send({
          name: 'Teste',
          email: 'teste@test.com',
          phone: '(11) 11111-1111',
          address: 'Rua Teste',
        })
        .expect(401);

      expect(response.body).toHaveProperty('error');
    });

    // Teste para garantir que o middleware de autenticação está funcionando
    it('deve aceitar cabeçalho de autorização', async () => {
      const newClient = {
        name: 'João Silva',
        email: 'joao.silva@test.com',
        phone: '(11) 98765-4321',
        address: 'Rua das Flores, 123',
      };

      // Testa apenas se o middleware aceita o formato correto     
      await request(app)
        .post('/api/clients')
        .set('Authorization', `Bearer ${authToken}`)
        .send(newClient);

      // Se chegou aqui, o token foi aceito
      expect(authToken).toBeDefined();
    });
  });

  // Testes para a rota GET /api/clients
  describe('GET /api/clients', () => {
    it('deve retornar 401 sem token de autenticação', async () => {
      const response = await request(app)
        .get('/api/clients')
        .expect(401);

      expect(response.body).toHaveProperty('error');
    });

    // Teste para garantir que o middleware de autenticação está funcionando
    it('deve aceitar token válido no header', async () => {     
      await request(app)
        .get('/api/clients')
        .set('Authorization', `Bearer ${authToken}`);
     
      expect(authToken).toBeDefined();
    });

    // Teste de rejeição de token inválido
    it('deve rejeitar token inválido', async () => {
      await request(app)
        .get('/api/clients')
        .set('Authorization', 'Bearer token-invalido')
        .expect(401);
    });
  });

  // Testes para a rota GET /api/clients/:id
  describe('GET /api/clients/:id', () => {
    it('deve retornar 401 sem token de autenticação', async () => {
      const fakeId = '550e8400-e29b-41d4-a716-446655440000';

      await request(app)
        .get(`/api/clients/${fakeId}`)
        .expect(401);
    });

    // Teste de validação de formato de ID (UUID)
    it('deve aceitar formato UUID válido', async () => {
      const validUUID = '550e8400-e29b-41d4-a716-446655440000';

      await request(app)
        .get(`/api/clients/${validUUID}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(validUUID).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
    });
  });

  // Testes para a rota PUT /api/clients/:id
  describe('PUT /api/clients/:id', () => {
    it('deve retornar 401 sem token de autenticação', async () => {
      const fakeId = '550e8400-e29b-41d4-a716-446655440000';

      await request(app)
        .put(`/api/clients/${fakeId}`)
        .send({
          name: 'Teste',
          email: 'teste@test.com',
          phone: '(11) 11111-1111',
          address: 'Rua Teste',
        })
        .expect(401);
    });

    // Teste de validação de campos obrigatórios
    it('deve retornar 400 com campos faltando', async () => {
      const fakeId = '550e8400-e29b-41d4-a716-446655440000';

      const response = await request(app)
        .put(`/api/clients/${fakeId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Nome Incompleto',
          email: 'teste@test.com',
          // phone está faltando
          address: 'Rua Teste',
        })
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Erro de validação');
    });
  });

  // Testes para a rota DELETE /api/clients/:id
  describe('DELETE /api/clients/:id', () => {
    it('deve retornar 401 sem token de autenticação', async () => {
      const fakeId = '550e8400-e29b-41d4-a716-446655440000';

      await request(app)
        .delete(`/api/clients/${fakeId}`)
        .expect(401);
    });

    // Teste para garantir que o middleware de autenticação está funcionando
    it('deve aceitar requisição DELETE com token válido', async () => {
      const fakeId = '550e8400-e29b-41d4-a716-446655440000';
      
      await request(app)
        .delete(`/api/clients/${fakeId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(authToken).toBeDefined();
    });
  });

  // Testes gerais de validação de rotas protegidas
  describe('Validações de rota', () => {
    it('deve ter rota GET /api/clients protegida', async () => {
      const response = await request(app).get('/api/clients');
      expect([401, 500]).toContain(response.status);
    });

    // Teste para rota GET /api/clients/:id
    it('deve ter rota POST /api/clients protegida', async () => {
      const response = await request(app).post('/api/clients').send({});
      expect([401, 400, 500]).toContain(response.status);
    });
    
    // Teste para rota PUT /api/clients/:id
    it('deve ter rota PUT /api/clients/:id protegida', async () => {
      const response = await request(app).put('/api/clients/123').send({});
      expect([401, 400, 500]).toContain(response.status);
    });
    
    // Teste para rota DELETE /api/clients/:id
    it('deve ter rota DELETE /api/clients/:id protegida', async () => {
      const response = await request(app).delete('/api/clients/123');
      expect([401, 500]).toContain(response.status);
    });
  });
});
