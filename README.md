# Sistema de Gerenciamento de Clientes

Sistema full-stack para cadastro e gerenciamento de clientes com autenticação JWT.

## 🚀 Tecnologias

**Frontend**
- React 19 + TypeScript + Vite
- Material-UI
- React Hook Form + Yup
- React Router + Axios

**Backend**
- Node.js + Express + TypeScript
- PostgreSQL + TypeORM
- JWT + Bcrypt
- Jest (testes)

## 📋 Funcionalidades

- Autenticação com JWT
- CRUD completo de clientes
- Busca de endereço por CEP (ViaCEP)
- Geração de PDF da lista de clientes
- Interface responsiva
- Validações de formulário
- Testes unitários e de integração

## ⚙️ Instalação e Execução

### 🐳 Com Docker (Recomendado)

```bash
# Clone o repositório
git clone <url-do-repo>
cd Projeto-FullStack

# Suba os containers
docker-compose up -d

# Acesse a aplicação
# Frontend: http://localhost:5173
# Backend: http://localhost:3000
# PostgreSQL: localhost:5432
```

### 💻 Sem Docker

**Backend:**
```bash
cd Backend
npm install
cp .env.example .env  # Configure as variáveis
npm run dev           # Desenvolvimento
npm test              # Testes
```

**Frontend:**
```bash
cd Frontend
npm install
npm run dev           # Desenvolvimento
npm run build         # Produção
```

> **Nota:** Sem Docker você precisa ter o PostgreSQL instalado e configurado localmente.

## 🔑 Credenciais

- Usuário: `admin`
- Senha: `admin`

## 📦 Scripts Disponíveis

**Backend:**
- `npm run dev` - Inicia servidor em modo desenvolvimento
- `npm run build` - Compila TypeScript
- `npm test` - Executa testes

**Frontend:**
- `npm run dev` - Inicia aplicação em desenvolvimento
- `npm run build` - Build para produção
- `npm run preview` - Preview do build

## 🗄️ Banco de Dados

Configure o PostgreSQL e atualize o `.env`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha
DB_DATABASE=client_management
JWT_SECRET=seu_secret_key
```
