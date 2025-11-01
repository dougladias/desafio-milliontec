import 'reflect-metadata';

// Setup global antes de todos os testes
beforeAll(() => {
  // Configurações globais para testes
  process.env.NODE_ENV = 'test';
  process.env.JWT_SECRET = 'test_secret_key';
});

// Cleanup após todos os testes
afterAll(async () => {
  // Cleanup se necessário
});
