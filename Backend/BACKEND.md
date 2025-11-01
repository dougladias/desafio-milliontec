# Backend - Sistema de Cadastro de Clientes

Backend da aplicação de cadastro e listagem de clientes desenvolvido como parte do desafio técnico para desenvolvedor React.

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **TypeScript** - Superset JavaScript com tipagem estática
- **Express** - Framework web minimalista
- **TypeORM** - ORM para TypeScript e JavaScript
- **PostgreSQL** - Banco de dados relacional
- **JWT** - JSON Web Tokens para autenticação
- **bcrypt** - Criptografia de senhas
- **dotenv** - Gerenciamento de variáveis de ambiente
- **ts-node-dev** - Execução e reload automático em desenvolvimento

## 📋 Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (v18 ou superior)
- [PostgreSQL](https://www.postgresql.org/) (v14 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

## ⚙️ Configuração do Ambiente

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd Backend
```

### 2. Instale as dependências

```bash
npm install
```

ou

```bash
yarn install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Servidor
PORT=3001
NODE_ENV=development

# Banco de Dados PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=sua_senha_aqui
DB_DATABASE=clientes_db

# Autenticação
JWT_SECRET=seu_secret_jwt_aqui
JWT_EXPIRES_IN=1d

# Credenciais fixas (conforme especificação do desafio)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin
```

### 4. Configure o banco de dados

Certifique-se de que o PostgreSQL está rodando e crie o banco de dados:

```bash
# Acesse o PostgreSQL
psql -U postgres

# Crie o banco de dados
CREATE DATABASE clientes_db;

# Saia do PostgreSQL
\q
```

### 5. Execute as migrations

```bash
npm run migration:run
```

ou

```bash
yarn migration:run
```

## 🏃 Executando o Projeto

### Modo Desenvolvimento

```bash
npm run dev
```

ou

```bash
yarn dev
```

O servidor estará rodando em `http://localhost:3001`

### Modo Produção

```bash
# Build do projeto
npm run build

# Executar build
npm start
```

## 📚 Estrutura do Projeto

A arquitetura foi projetada seguindo princípios **SOLID** e **Clean Architecture**, permitindo fácil manutenção e escalabilidade.

```
Backend/
├── src/
│   ├── config/              # 📝 Configurações e constantes
│   │   └── env.ts           # Variáveis de ambiente
│   │
│   ├── database/            # 🗄️ Camada de dados
│   │   ├── data-source.ts   # Configuração TypeORM
│   │   └── migrations/      # Migrations do banco
│   │
│   ├── entities/            # 🏗️ Entidades do domínio
│   │   └── Client.ts        # Entidade Cliente
│   │
│   ├── services/            # 💼 Regras de negócio
│   │   ├── AuthService.ts   # Lógica de autenticação
│   │   └── ClientService.ts # Lógica de clientes
│   │
│   ├── controllers/         # 🎮 Controladores HTTP
│   │   ├── AuthController.ts
│   │   └── ClientController.ts
│   │
│   ├── routes/              # 🛣️ Definição de rotas
│   │   ├── index.ts         # Agregador de rotas
│   │   ├── auth.routes.ts   # Rotas de autenticação
│   │   └── client.routes.ts # Rotas de clientes
│   │
│   ├── middlewares/         # 🔒 Middlewares
│   │   ├── auth.middleware.ts      # Validação JWT
│   │   ├── error.middleware.ts     # Tratamento de erros
│   │   └── validation.middleware.ts # Validação de dados
│   │
│   ├── types/               # 📋 Definições TypeScript
│   │   ├── express.d.ts     # Extensões do Express
│   │   └── interfaces.ts    # Interfaces compartilhadas
│   │
│   ├── utils/               # 🛠️ Utilitários
│   │   ├── jwt.util.ts      # Funções JWT
│   │   └── validation.util.ts # Validações
│   │
│   ├── app.ts               # ⚙️ Configuração do Express
│   └── server.ts            # 🚀 Entrada da aplicação
│
├── .env                     # Variáveis de ambiente
├── .env.example             # Exemplo de configuração
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

### 📐 Princípios da Arquitetura

#### 1️⃣ **Separação em Camadas**
- **Entities**: Representação dos dados do domínio
- **Services**: Lógica de negócio isolada
- **Controllers**: Interface HTTP (request/response)
- **Routes**: Mapeamento de endpoints
- **Middlewares**: Funcionalidades transversais

#### 2️⃣ **Responsabilidade Única**
Cada arquivo tem uma responsabilidade específica:
- Controllers apenas tratam requisições HTTP
- Services contêm toda a lógica de negócio
- Entities definem a estrutura de dados

#### 3️⃣ **Fácil Testabilidade**
- Services desacoplados dos controllers
- Fácil mock de dependências
- Lógica de negócio isolada

#### 4️⃣ **Escalabilidade**
```
Para adicionar um novo recurso (ex: Products):

1. Criar entidade:     src/entities/Product.ts
2. Criar service:      src/services/ProductService.ts
3. Criar controller:   src/controllers/ProductController.ts
4. Criar rotas:        src/routes/product.routes.ts
5. Registrar em:       src/routes/index.ts
```

## 🔌 Endpoints da API

### Autenticação

#### POST `/api/auth/login`

Realiza login e retorna token JWT.

**Request Body:**
```json
{
  "username": "admin",
  "password": "admin"
}
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "username": "admin"
  }
}
```

**Response (401 Unauthorized):**
```json
{
  "error": "Credenciais inválidas"
}
```

### Clientes

> **Nota:** Todas as rotas de clientes requerem autenticação via token JWT no header:
> ```
> Authorization: Bearer <token>
> ```

#### POST `/api/clients`

Cria um novo cliente.

**Request Body:**
```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "phone": "(11) 98765-4321",
  "address": "Rua Exemplo, 123"
}
```

**Response (201 Created):**
```json
{
  "id": "uuid-gerado",
  "name": "João Silva",
  "email": "joao@example.com",
  "phone": "(11) 98765-4321",
  "address": "Rua Exemplo, 123",
  "createdAt": "2025-10-31T12:00:00.000Z",
  "updatedAt": "2025-10-31T12:00:00.000Z"
}
```

#### GET `/api/clients`

Lista todos os clientes.

**Response (200 OK):**
```json
[
  {
    "id": "uuid-1",
    "name": "João Silva",
    "email": "joao@example.com",
    "phone": "(11) 98765-4321",
    "address": "Rua Exemplo, 123",
    "createdAt": "2025-10-31T12:00:00.000Z",
    "updatedAt": "2025-10-31T12:00:00.000Z"
  },
  {
    "id": "uuid-2",
    "name": "Maria Santos",
    "email": "maria@example.com",
    "phone": "(11) 91234-5678",
    "address": "Av. Principal, 456",
    "createdAt": "2025-10-31T13:00:00.000Z",
    "updatedAt": "2025-10-31T13:00:00.000Z"
  }
]
```

#### GET `/api/clients/:id`

Busca um cliente específico por ID.

**Response (200 OK):**
```json
{
  "id": "uuid-1",
  "name": "João Silva",
  "email": "joao@example.com",
  "phone": "(11) 98765-4321",
  "address": "Rua Exemplo, 123",
  "createdAt": "2025-10-31T12:00:00.000Z",
  "updatedAt": "2025-10-31T12:00:00.000Z"
}
```

**Response (404 Not Found):**
```json
{
  "error": "Cliente não encontrado"
}
```

#### PUT `/api/clients/:id`

Atualiza um cliente existente.

**Request Body:**
```json
{
  "name": "João Silva Santos",
  "email": "joao.santos@example.com",
  "phone": "(11) 98765-4321",
  "address": "Rua Nova, 789"
}
```

**Response (200 OK):**
```json
{
  "id": "uuid-1",
  "name": "João Silva Santos",
  "email": "joao.santos@example.com",
  "phone": "(11) 98765-4321",
  "address": "Rua Nova, 789",
  "createdAt": "2025-10-31T12:00:00.000Z",
  "updatedAt": "2025-10-31T14:00:00.000Z"
}
```

#### DELETE `/api/clients/:id`

Remove um cliente (opcional, caso implementado).

**Response (204 No Content)**

## 🏗️ Arquitetura Detalhada

### Fluxo de uma Requisição

```
Cliente HTTP
    ↓
┌───────────────────────────────────────────┐
│  1. ROUTES (routes/*.routes.ts)          │
│     Define os endpoints e métodos HTTP    │
└───────────────┬───────────────────────────┘
                ↓
┌───────────────────────────────────────────┐
│  2. MIDDLEWARES (middlewares/)            │
│     - Autenticação (JWT)                  │
│     - Validação de dados                  │
│     - Tratamento de erros                 │
└───────────────┬───────────────────────────┘
                ↓
┌───────────────────────────────────────────┐
│  3. CONTROLLERS (controllers/)            │
│     - Recebe request                      │
│     - Extrai dados do body/params/query   │
│     - Chama o service apropriado          │
│     - Retorna response HTTP               │
└───────────────┬───────────────────────────┘
                ↓
┌───────────────────────────────────────────┐
│  4. SERVICES (services/)                  │
│     - Valida regras de negócio            │
│     - Interage com o banco de dados       │
│     - Processa lógica da aplicação        │
│     - Retorna dados ou erros              │
└───────────────┬───────────────────────────┘
                ↓
┌───────────────────────────────────────────┐
│  5. ENTITIES (entities/)                  │
│     - Define estrutura dos dados          │
│     - Mapeia tabelas do banco             │
│     - TypeORM gerencia operações          │
└───────────────┬───────────────────────────┘
                ↓
           PostgreSQL
```

### 📦 Camadas da Aplicação

#### **1. Entities (Entidades)**
```typescript
// src/entities/Client.ts
// Define COMO os dados são estruturados
@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
  // ...
}
```

#### **2. Services (Serviços)**
```typescript
// src/services/ClientService.ts
// Define O QUE a aplicação faz (regras de negócio)
export class ClientService {
  async createClient(data: ClientDTO) {
    // Valida email único
    // Salva no banco
    // Retorna cliente criado
  }
}
```

#### **3. Controllers (Controladores)**
```typescript
// src/controllers/ClientController.ts
// Define COMO os dados entram e saem via HTTP
export class ClientController {
  async create(req: Request, res: Response) {
    const data = req.body;
    const client = await clientService.createClient(data);
    return res.status(201).json(client);
  }
}
```

#### **4. Routes (Rotas)**
```typescript
// src/routes/client.routes.ts
// Define ONDE cada funcionalidade é acessada
router.post('/clients', authMiddleware, clientController.create);
router.get('/clients', authMiddleware, clientController.list);
```

### 🎯 Vantagens desta Arquitetura

✅ **Separação de Responsabilidades**: Cada camada tem uma função específica

✅ **Fácil Manutenção**: Mudanças em uma camada não afetam as outras

✅ **Testabilidade**: Services podem ser testados sem depender do HTTP

✅ **Reutilização**: Services podem ser chamados por diferentes controllers

✅ **Escalabilidade**: Fácil adicionar novos recursos seguindo o padrão

### 🔄 Exemplo Prático: Criar um Cliente

```typescript
// 1. Cliente faz POST /api/clients
// 2. Route direciona para ClientController.create()
// 3. Middleware auth valida o token JWT
// 4. Controller extrai dados do request.body
// 5. Controller chama ClientService.createClient()
// 6. Service valida se email já existe
// 7. Service salva no banco usando Entity
// 8. Service retorna cliente criado
// 9. Controller retorna JSON com status 201
```

## 🔒 Autenticação

A autenticação é implementada usando JWT (JSON Web Tokens):

1. O usuário faz login com credenciais fixas (`admin`/`admin`)
2. O backend valida as credenciais
3. Se válidas, retorna um token JWT
4. O frontend armazena o token (localStorage/sessionStorage)
5. Requisições subsequentes incluem o token no header `Authorization`
6. O middleware `auth.ts` valida o token em rotas protegidas

## 🗄️ Banco de Dados

### Tabela: clients

| Campo      | Tipo         | Descrição                    |
|------------|--------------|------------------------------|
| id         | UUID         | Identificador único (PK)     |
| name       | VARCHAR(255) | Nome do cliente              |
| email      | VARCHAR(255) | E-mail do cliente (único)    |
| phone      | VARCHAR(20)  | Telefone do cliente          |
| address    | TEXT         | Endereço do cliente          |
| createdAt  | TIMESTAMP    | Data de criação              |
| updatedAt  | TIMESTAMP    | Data de última atualização   |

## 🧪 Testes

```bash
# Executar testes unitários
npm test

# Executar testes com coverage
npm run test:coverage
```

## 🐳 Docker (Opcional)

### Usando Docker Compose

```bash
# Subir os containers
docker-compose up -d

# Parar os containers
docker-compose down
```

O arquivo `docker-compose.yml` configura automaticamente:
- Container do PostgreSQL
- Container da aplicação Node.js
- Rede entre os containers

## 📝 Scripts Disponíveis

| Script              | Descrição                                    |
|---------------------|----------------------------------------------|
| `npm run dev`       | Inicia o servidor em modo desenvolvimento    |
| `npm run build`     | Compila o TypeScript para JavaScript         |
| `npm start`         | Inicia o servidor em modo produção           |
| `npm test`          | Executa os testes                            |
| `npm run migration:generate` | Gera nova migration                 |
| `npm run migration:run`      | Executa migrations pendentes        |
| `npm run migration:revert`   | Reverte última migration            |

## 🔧 Variáveis de Ambiente

| Variável          | Descrição                          | Padrão       |
|-------------------|------------------------------------|--------------|
| PORT              | Porta do servidor                  | 3001         |
| NODE_ENV          | Ambiente de execução               | development  |
| DB_HOST           | Host do PostgreSQL                 | localhost    |
| DB_PORT           | Porta do PostgreSQL                | 5432         |
| DB_USERNAME       | Usuário do banco                   | postgres     |
| DB_PASSWORD       | Senha do banco                     | -            |
| DB_DATABASE       | Nome do banco de dados             | clientes_db  |
| JWT_SECRET        | Chave secreta para JWT             | -            |
| JWT_EXPIRES_IN    | Tempo de expiração do token        | 1d           |
| ADMIN_USERNAME    | Usuário admin fixo                 | admin        |
| ADMIN_PASSWORD    | Senha admin fixa                   | admin        |

## 🚀 Deploy

### Opções de Deploy

- **Railway** - Deploy automático via GitHub
- **Render** - Deploy gratuito com PostgreSQL
- **Heroku** - Com addon PostgreSQL
- **DigitalOcean** - App Platform
- **AWS** - Elastic Beanstalk ou ECS

### Exemplo: Deploy no Railway

1. Crie uma conta no [Railway](https://railway.app)
2. Conecte seu repositório GitHub
3. Configure as variáveis de ambiente
4. Railway detectará automaticamente Node.js e fará o deploy

## 🤝 Boas Práticas Implementadas

- ✅ Separação de responsabilidades (Controllers, Services, Entities)
- ✅ Uso de TypeScript para type-safety
- ✅ Validação de dados de entrada
- ✅ Tratamento de erros centralizado
- ✅ Autenticação JWT
- ✅ Variáveis de ambiente para configuração
- ✅ Nomenclatura consistente e descritiva
- ✅ Código modular e reutilizável
- ✅ Comentários onde necessário
- ✅ README completo e documentado

## 📄 Licença

Este projeto foi desenvolvido como parte de um desafio técnico.

## 👨‍💻 Autor

Desenvolvido como parte do desafio técnico para desenvolvedor React.

---

**Desenvolvido com ❤️ usando Node.js, TypeScript e PostgreSQL**
