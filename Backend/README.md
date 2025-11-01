# Backend - Sistema de Gerenciamento de Clientes

API REST para gerenciamento de clientes com autenticacao JWT.

## Tecnologias

- Node.js + Express + TypeScript
- PostgreSQL + TypeORM
- JWT 
- Jest (testes)
- Swagger (documentacao)

## Instalacao

### Pre-requisitos
- Node.js 20+
- PostgreSQL 15+

### Passo a passo

1. **Instale as dependencias**
```bash
npm install
```

2. **Execute as migrations**
```bash
npm run typeorm migration:run
```

3. **Inicie o servidor**
```bash
npm run dev
```

Servidor rodando em: http://localhost:3001

## Usando Docker

```bash
# Na pasta raiz do backend
docker-compose up --build
```

## Documentacao da API

Acesse: http://localhost:3001/api-docs

## Testes

```bash
# Todos os testes
npm test

# Testes unitarios
npm run test:unit

# Testes de integracao
npm run test:integration
```

## Credenciais Padrao

- Usuario: `admin`
- Senha: `admin`