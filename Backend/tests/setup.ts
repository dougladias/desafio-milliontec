import 'reflect-metadata';

// Setup global antes de todos os testes
beforeAll(() => {  
  process.env.NODE_ENV;
  process.env.JWT_SECRET;
});
