import express, { Application } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import routes from './routes';
import { errorMiddleware } from './middlewares/error/error.middleware';
import { swaggerSpec } from './config/swagger';

// Cria a aplicação Express
const app: Application = express();

// Middlewares globais
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'API Clientes - Documentação',
}));

// Rotas da API
app.use('/api', routes);

// Middleware de tratamento de erros
app.use(errorMiddleware);

export default app;
