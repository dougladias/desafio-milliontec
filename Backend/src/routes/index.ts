import { Router } from 'express';
import authRoutes from './auth/auth.routes';
import clientRoutes from './client/client.routes';

const router = Router();

// Agrupa todas as rotas da API
router.use('/auth', authRoutes);
router.use('/clients', clientRoutes);

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Verifica o status da API
 *     description: Endpoint de health check para verificar se a API está funcionando corretamente
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API está funcionando corretamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthCheck'
 *             examples:
 *               healthExample:
 *                 summary: Resposta de sucesso
 *                 value:
 *                   status: OK
 *                   message: API is running
 */
router.get('/health', (_req, res) => {
  res.json({ status: 'OK', message: 'API is running' });
});

export default router;
