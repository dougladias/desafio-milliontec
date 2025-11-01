import { Router } from 'express';
import { AuthController } from '../../controllers/AuthController';
import { validateDTO } from '../../middlewares/validation/validation.middleware';
import { LoginDTO } from '../../dtos/LoginDTO';

const router = Router();
const authController = new AuthController();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realiza login na aplicação
 *     description: Autentica o usuário com credenciais fixas (admin/admin) e retorna um token JWT válido por 24 horas
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *           examples:
 *             loginExample:
 *               summary: Credenciais de login
 *               value:
 *                 username: admin
 *                 password: admin
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *             examples:
 *               successExample:
 *                 summary: Resposta de sucesso
 *                 value:
 *                   token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjk5OTk5OTk5LCJleHAiOjE3MDAwODYzOTl9.example
 *                   user:
 *                     username: admin
 *       400:
 *         description: Dados inválidos ou ausentes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               missingFieldsExample:
 *                 summary: Campos obrigatórios ausentes
 *                 value:
 *                   error: Username e password são obrigatórios
 *       401:
 *         description: Credenciais inválidas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               invalidCredentialsExample:
 *                 summary: Credenciais incorretas
 *                 value:
 *                   error: Credenciais inválidas
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               serverErrorExample:
 *                 summary: Erro no servidor
 *                 value:
 *                   error: Erro ao realizar login
 */
router.post('/login', validateDTO(LoginDTO), authController.login);

export default router;
