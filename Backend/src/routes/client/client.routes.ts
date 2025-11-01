import { Router } from 'express';
import { ClientController } from '../../controllers/ClientController';
import { authMiddleware } from '../../middlewares/auth/auth.middleware';
import { validateDTO } from '../../middlewares/validation/validation.middleware';
import { CreateClientDTO } from '../../dtos/CreateClientDTO';
import { UpdateClientDTO } from '../../dtos/UpdateClientDTO';

const router = Router();
const clientController = new ClientController();

// Todas as rotas de clientes requerem autenticação
router.use(authMiddleware);

/**
 * @swagger
 * /clients:
 *   post:
 *     summary: Cria um novo cliente
 *     description: Cria um novo cliente no sistema. O email deve ser único.
 *     tags: [Clients]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClientInput'
 *           examples:
 *             clientExample:
 *               summary: Exemplo de cliente
 *               value:
 *                 name: João Silva
 *                 email: joao.silva@email.com
 *                 phone: (11) 98765-4321
 *                 address: Rua das Flores, 123 - São Paulo, SP
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       400:
 *         description: Dados inválidos ou campos obrigatórios ausentes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               missingFieldsExample:
 *                 summary: Campos obrigatórios ausentes
 *                 value:
 *                   error: Todos os campos são obrigatórios
 *       401:
 *         description: Token não fornecido ou inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Email já cadastrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               duplicateEmailExample:
 *                 summary: Email duplicado
 *                 value:
 *                   error: Email já cadastrado
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', validateDTO(CreateClientDTO), clientController.create);

/**
 * @swagger
 * /clients:
 *   get:
 *     summary: Lista todos os clientes
 *     description: Retorna uma lista com todos os clientes cadastrados, ordenados por data de criação (mais recentes primeiro)
 *     tags: [Clients]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de clientes retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Client'
 *             examples:
 *               clientsListExample:
 *                 summary: Exemplo de lista de clientes
 *                 value:
 *                   - id: 550e8400-e29b-41d4-a716-446655440000
 *                     name: João Silva
 *                     email: joao.silva@email.com
 *                     phone: (11) 98765-4321
 *                     address: Rua das Flores, 123 - São Paulo, SP
 *                     createdAt: 2025-10-31T15:30:00.000Z
 *                     updatedAt: 2025-10-31T15:30:00.000Z
 *                   - id: 660f9511-f3ac-52e5-b827-557766551111
 *                     name: Maria Santos
 *                     email: maria.santos@email.com
 *                     phone: (21) 99876-5432
 *                     address: Av. Paulista, 456 - Rio de Janeiro, RJ
 *                     createdAt: 2025-10-30T10:20:00.000Z
 *                     updatedAt: 2025-10-30T10:20:00.000Z
 *       401:
 *         description: Token não fornecido ou inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', clientController.findAll);

/**
 * @swagger
 * /clients/{id}:
 *   get:
 *     summary: Busca um cliente por ID
 *     description: Retorna os dados de um cliente específico pelo seu ID único
 *     tags: [Clients]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID único do cliente (UUID)
 *         example: 550e8400-e29b-41d4-a716-446655440000
 *     responses:
 *       200:
 *         description: Cliente encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       401:
 *         description: Token não fornecido ou inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Cliente não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               notFoundExample:
 *                 summary: Cliente não existe
 *                 value:
 *                   error: Cliente não encontrado
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', clientController.findById);

/**
 * @swagger
 * /clients/{id}:
 *   put:
 *     summary: Atualiza um cliente existente
 *     description: Atualiza os dados de um cliente específico. O email deve ser único (caso seja alterado).
 *     tags: [Clients]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID único do cliente (UUID)
 *         example: 550e8400-e29b-41d4-a716-446655440000
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClientInput'
 *           examples:
 *             updateExample:
 *               summary: Exemplo de atualização
 *               value:
 *                 name: João Silva Santos
 *                 email: joao.silva@email.com
 *                 phone: (11) 98765-4321
 *                 address: Rua das Flores, 456 - São Paulo, SP
 *     responses:
 *       200:
 *         description: Cliente atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       400:
 *         description: Dados inválidos ou campos obrigatórios ausentes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Token não fornecido ou inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Cliente não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Email já cadastrado para outro cliente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:id', validateDTO(UpdateClientDTO), clientController.update);

/**
 * @swagger
 * /clients/{id}:
 *   delete:
 *     summary: Deleta um cliente
 *     description: Remove permanentemente um cliente do sistema
 *     tags: [Clients]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID único do cliente (UUID)
 *         example: 550e8400-e29b-41d4-a716-446655440000
 *     responses:
 *       204:
 *         description: Cliente deletado com sucesso (sem conteúdo na resposta)
 *       401:
 *         description: Token não fornecido ou inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Cliente não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', clientController.delete);

export default router;
