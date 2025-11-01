import swaggerJsdoc from 'swagger-jsdoc';
import { config } from './env';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Gerenciamento de Clientes',
      version: '1.0.0',
      description: `
Backend da aplicação de cadastro e listagem de clientes desenvolvido como parte do desafio técnico para desenvolvedor React.

## Funcionalidades
- Autenticação JWT
- CRUD completo de clientes
- Validação de dados
      `.trim(),      
      license: {
        name: 'ISC',
      },
    },
    servers: [
      {
        url: `http://localhost:${config.port}/api`,
        description: 'Servidor de Desenvolvimento',
      }     
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Insira o token JWT obtido no endpoint de login',
        },
      },
      schemas: {
        Client: {
          type: 'object',
          required: ['name', 'email', 'phone', 'address'],
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'ID único do cliente (gerado automaticamente)',
              example: '550e8400-e29b-41d4-a716-446655440000',
            },
            name: {
              type: 'string',
              description: 'Nome completo do cliente',
              example: 'João Silva',
              minLength: 3,
              maxLength: 255,
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'E-mail do cliente (único)',
              example: 'joao.silva@email.com',
            },
            phone: {
              type: 'string',
              description: 'Telefone do cliente',
              example: '(11) 98765-4321',
              maxLength: 20,
            },
            address: {
              type: 'string',
              description: 'Endereço completo do cliente',
              example: 'Rua das Flores, 123 - São Paulo, SP',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação do registro',
              example: '2025-10-31T15:30:00.000Z',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data da última atualização',
              example: '2025-10-31T15:30:00.000Z',
            },
          },
        },
        ClientInput: {
          type: 'object',
          required: ['name', 'email', 'phone', 'address'],
          properties: {
            name: {
              type: 'string',
              description: 'Nome completo do cliente',
              example: 'João Silva',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'E-mail do cliente',
              example: 'joao.silva@email.com',
            },
            phone: {
              type: 'string',
              description: 'Telefone do cliente',
              example: '(11) 98765-4321',
            },
            address: {
              type: 'string',
              description: 'Endereço completo do cliente',
              example: 'Rua das Flores, 123 - São Paulo, SP',
            },
          },
        },
        LoginRequest: {
          type: 'object',
          required: ['username', 'password'],
          properties: {
            username: {
              type: 'string',
              description: 'Nome de usuário (fixo: admin)',
              example: 'admin',
            },
            password: {
              type: 'string',
              format: 'password',
              description: 'Senha (fixa: admin)',
              example: 'admin',
            },
          },
        },
        LoginResponse: {
          type: 'object',
          properties: {
            token: {
              type: 'string',
              description: 'Token JWT para autenticação',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            },
            user: {
              type: 'object',
              properties: {
                username: {
                  type: 'string',
                  example: 'admin',
                },
              },
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Mensagem de erro',
              example: 'Erro ao processar requisição',
            },
          },
        },
        HealthCheck: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              example: 'OK',
            },
            message: {
              type: 'string',
              example: 'API is running',
            },
          },
        },
      },
    },
    tags: [
      {
        name: 'Health',
        description: 'Endpoint de verificação de saúde da API',
      },
      {
        name: 'Auth',
        description: 'Endpoints de autenticação',
      },
      {
        name: 'Clients',
        description: 'Endpoints de gerenciamento de clientes',
      },
    ],
  },
  apis: ['./src/routes/**/*.ts'], // Caminho dos arquivos com as anotações JSDoc
};

export const swaggerSpec = swaggerJsdoc(options);
