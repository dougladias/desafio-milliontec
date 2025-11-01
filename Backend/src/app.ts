import express, { Application } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import routes from './routes';
import { errorMiddleware } from './middlewares/error/error.middleware';
import { swaggerSpec } from './config/swagger';

// Cria a aplicação Express
const app: Application = express();

// Middlewares globais
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota de health check
const healthCheck = (_req: any, res: any) => {
  res.status(200).json({
    status: 'OK',
    message: 'API está funcionando',
    timestamp: new Date().toISOString(),
  });
};

// Health check na raiz e em /health
app.get('/', healthCheck);
app.get('/health', healthCheck);

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
